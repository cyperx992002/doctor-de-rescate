import base64
import hashlib
import hmac
import json
import os
import re
import secrets
from datetime import datetime, timedelta
from pathlib import Path
from typing import Annotated
from urllib import request, error
from urllib.parse import urlencode, urlparse

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import LoginSession, MobileOAuthHandoff, SocialAccount, User

load_dotenv(Path(__file__).resolve().parent / ".env")

SESSION_COOKIE = "doctor_rescate_session"
SESSION_DURATION = timedelta(days=30)
PASSWORD_ITERATIONS = 310_000
USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9_]{3,32}$")
OAUTH_STATE_DURATION = 600
MOBILE_OAUTH_HANDOFF_DURATION = timedelta(minutes=5)
MOBILE_REDIRECT_URI = "doctorrescate://oauth/callback"
LOCAL_OAUTH_BASE_URL = "http://127.0.0.1:8001"


class Credentials(BaseModel):
    username: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=10, max_length=128)


class UserResponse(BaseModel):
    username: str


class MobileAuthResponse(UserResponse):
    access_token: str
    token_type: str = "bearer"


class MobileOAuthExchange(BaseModel):
    code: str = Field(min_length=20, max_length=128)
    code_verifier: str = Field(pattern=r"^[A-Za-z0-9_-]{43,128}$")


class AssistantRequest(BaseModel):
    message: str = Field(default="", max_length=2000)
    image_data: str | None = None
    image_mime_type: str | None = None
    language: str = "ar"


class AssistantResponse(BaseModel):
    answer: str


DbSession = Annotated[Session, Depends(get_db)]

app = FastAPI(title="Doctor de Rescate", description="Arabic-first first-aid guide")


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)


def hash_password(password: str, salt: bytes) -> bytes:
    return hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PASSWORD_ITERATIONS
    )


def token_digest(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def set_session_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=SESSION_COOKIE,
        value=token,
        max_age=int(SESSION_DURATION.total_seconds()),
        httponly=True,
        secure=os.getenv("COOKIE_SECURE", "").lower() in {"1", "true", "yes"},
        samesite="lax",
        path="/",
    )


def create_session(db: Session, user: User, response: Response | None = None) -> str:
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + SESSION_DURATION
    db.add(LoginSession(token_hash=token_digest(token), user_id=user.id, expires_at=expires_at))
    db.commit()
    if response is not None:
        set_session_cookie(response, token)
    return token


def get_current_user(
    request: Request,
    db: DbSession,
) -> User:
    authorization = request.headers.get("authorization")
    if authorization:
        scheme, separator, credentials = authorization.partition(" ")
        token = credentials if separator and scheme.lower() == "bearer" else None
    else:
        token = request.cookies.get(SESSION_COOKIE)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="سجّل الدخول أولاً.")

    login_session = db.get(LoginSession, token_digest(token))
    if login_session is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="انتهت الجلسة. سجّل الدخول مجدداً.")
    if login_session.expires_at <= datetime.utcnow():
        db.delete(login_session)
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="انتهت الجلسة. سجّل الدخول مجدداً.")

    return login_session.user


CurrentUser = Annotated[User, Depends(get_current_user)]


def validate_username(username: str) -> str:
    normalized = username.strip()
    if not USERNAME_PATTERN.fullmatch(normalized):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="اسم المستخدم يجب أن يحتوي على 3 إلى 32 حرفاً إنجليزياً أو رقماً أو _.",
        )
    return normalized


@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(credentials: Credentials, response: Response, db: DbSession) -> UserResponse:
    username = validate_username(credentials.username)
    if db.scalar(select(User).where(User.username == username)) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="اسم المستخدم مستخدم بالفعل.")

    salt = secrets.token_bytes(16)
    user = User(
        username=username,
        password_salt=salt.hex(),
        password_hash=hash_password(credentials.password, salt).hex(),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="اسم المستخدم مستخدم بالفعل.") from None
    db.refresh(user)
    create_session(db, user, response)
    return UserResponse(username=user.username)


@app.post("/api/auth/mobile/register", response_model=MobileAuthResponse, status_code=status.HTTP_201_CREATED)
def mobile_register(credentials: Credentials, db: DbSession) -> MobileAuthResponse:
    username = validate_username(credentials.username)
    if db.scalar(select(User).where(User.username == username)) is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="اسم المستخدم مستخدم بالفعل.")

    salt = secrets.token_bytes(16)
    user = User(
        username=username,
        password_salt=salt.hex(),
        password_hash=hash_password(credentials.password, salt).hex(),
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="اسم المستخدم مستخدم بالفعل.") from None
    db.refresh(user)
    token = create_session(db, user)
    return MobileAuthResponse(username=user.username, access_token=token)


@app.post("/api/auth/login", response_model=UserResponse)
def login(credentials: Credentials, response: Response, db: DbSession) -> UserResponse:
    username = validate_username(credentials.username)
    user = db.scalar(select(User).where(User.username == username))
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="اسم المستخدم أو كلمة المرور غير صحيحة.")

    expected_hash = hash_password(credentials.password, bytes.fromhex(user.password_salt))
    if not hmac.compare_digest(expected_hash.hex(), user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="اسم المستخدم أو كلمة المرور غير صحيحة.")

    create_session(db, user, response)
    return UserResponse(username=user.username)


@app.post("/api/auth/mobile/login", response_model=MobileAuthResponse)
def mobile_login(credentials: Credentials, db: DbSession) -> MobileAuthResponse:
    username = validate_username(credentials.username)
    user = db.scalar(select(User).where(User.username == username))
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="اسم المستخدم أو كلمة المرور غير صحيحة.")

    expected_hash = hash_password(credentials.password, bytes.fromhex(user.password_salt))
    if not hmac.compare_digest(expected_hash.hex(), user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="اسم المستخدم أو كلمة المرور غير صحيحة.")

    token = create_session(db, user)
    return MobileAuthResponse(username=user.username, access_token=token)


@app.post("/api/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response, db: DbSession) -> Response:
    authorization = request.headers.get("authorization")
    if authorization:
        scheme, separator, credentials = authorization.partition(" ")
        token = credentials if separator and scheme.lower() == "bearer" else None
    else:
        token = request.cookies.get(SESSION_COOKIE)
    if token:
        login_session = db.get(LoginSession, token_digest(token))
        if login_session is not None:
            db.delete(login_session)
            db.commit()
    response.delete_cookie(key=SESSION_COOKIE, path="/", httponly=True, samesite="lax")
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@app.get("/api/auth/me", response_model=UserResponse)
def current_user(user: CurrentUser) -> UserResponse:
    return UserResponse(username=user.username)


def oauth_provider_settings(provider: str) -> tuple[str | None, str | None]:
    if provider == "google":
        return os.getenv("GOOGLE_CLIENT_ID"), os.getenv("GOOGLE_CLIENT_SECRET")
    if provider == "facebook":
        return os.getenv("FACEBOOK_APP_ID"), os.getenv("FACEBOOK_APP_SECRET")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unsupported sign-in provider.")


def oauth_base_url() -> str | None:
    base_url = os.getenv("PUBLIC_BASE_URL", LOCAL_OAUTH_BASE_URL).rstrip("/")
    parsed = urlparse(base_url)
    if parsed.scheme not in {"https", "http"} or not parsed.hostname or parsed.path not in {"", "/"}:
        return None
    if parsed.scheme == "http" and parsed.hostname not in {"localhost", "127.0.0.1"}:
        return None
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        return None
    return base_url


def oauth_callback_url(provider: str, base_url: str) -> str:
    return f"{base_url}/api/auth/{provider}/callback"


def oauth_state_cookie(provider: str) -> str:
    return f"doctor_rescate_oauth_state_{provider}"


def oauth_error_redirect(provider: str, error_code: str, mobile: bool = False) -> RedirectResponse:
    if mobile:
        query = urlencode({"error": error_code, "provider": provider})
        response = RedirectResponse(
            url=f"{MOBILE_REDIRECT_URI}?{query}",
            status_code=status.HTTP_303_SEE_OTHER,
        )
        response.delete_cookie(
            key=oauth_state_cookie(provider),
            path=f"/api/auth/{provider}/callback",
            httponly=True,
            samesite="lax",
        )
        return response
    query = urlencode({"auth_error": error_code, "auth_provider": provider})
    response = RedirectResponse(url=f"/?{query}", status_code=status.HTTP_303_SEE_OTHER)
    response.delete_cookie(
        key=oauth_state_cookie(provider),
        path=f"/api/auth/{provider}/callback",
        httponly=True,
        samesite="lax",
    )
    return response


@app.get("/api/auth/{provider}/start")
def social_login_start(
    provider: str,
    client: str = "web",
    code_challenge: str | None = None,
    code_challenge_method: str | None = None,
) -> Response:
    if client not in {"web", "android"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported sign-in client.")
    mobile = client == "android"
    if mobile and (
        code_challenge is None
        or not re.fullmatch(r"[A-Za-z0-9_-]{43,128}", code_challenge)
        or code_challenge_method != "S256"
    ):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A valid S256 PKCE challenge is required.")
    client_id, client_secret = oauth_provider_settings(provider)
    base_url = oauth_base_url()
    if not client_id or not client_secret or not base_url:
        return oauth_error_redirect(provider, "provider_not_configured", mobile)

    state = secrets.token_urlsafe(32)
    if mobile:
        state = f"android.{state}.{code_challenge}"
    callback_url = oauth_callback_url(provider, base_url)
    if provider == "google":
        authorization_url = "https://accounts.google.com/o/oauth2/v2/auth"
        parameters = {
            "client_id": client_id,
            "redirect_uri": callback_url,
            "response_type": "code",
            "scope": "openid email",
            "state": state,
        }
    else:
        version = os.getenv("FACEBOOK_GRAPH_API_VERSION", "v24.0")
        if not re.fullmatch(r"v\d+\.\d+", version):
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Invalid Facebook API version.")
        authorization_url = f"https://www.facebook.com/{version}/dialog/oauth"
        parameters = {
            "client_id": client_id,
            "redirect_uri": callback_url,
            "response_type": "code",
            "scope": "public_profile",
            "state": state,
        }

    response = RedirectResponse(
        url=f"{authorization_url}?{urlencode(parameters)}",
        status_code=status.HTTP_302_FOUND,
    )
    response.set_cookie(
        key=oauth_state_cookie(provider),
        value=state,
        max_age=OAUTH_STATE_DURATION,
        httponly=True,
        secure=os.getenv("COOKIE_SECURE", "").lower() in {"1", "true", "yes"},
        samesite="lax",
        path=f"/api/auth/{provider}/callback",
    )
    return response


def oauth_json_request(url: str, form_data: dict[str, str] | None = None) -> dict:
    data = urlencode(form_data).encode("utf-8") if form_data is not None else None
    headers = {"Accept": "application/json"}
    if data is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    req = request.Request(url, data=data, headers=headers)
    try:
        with request.urlopen(req, timeout=20) as response:
            result = json.loads(response.read().decode("utf-8"))
    except (error.HTTPError, error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="The sign-in provider could not complete authentication.",
        ) from exc
    if not isinstance(result, dict):
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="The sign-in provider returned an invalid response.",
        )
    return result


def get_social_subject(provider: str, code: str, callback_url: str) -> str:
    client_id, client_secret = oauth_provider_settings(provider)
    if not client_id or not client_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Provider is not configured.")

    if provider == "google":
        tokens = oauth_json_request(
            "https://oauth2.googleapis.com/token",
            {
                "code": code,
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uri": callback_url,
                "grant_type": "authorization_code",
            },
        )
        id_token = tokens.get("id_token")
        if not isinstance(id_token, str):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Google did not return an ID token.")
        token_info = oauth_json_request(
            f"https://oauth2.googleapis.com/tokeninfo?{urlencode({'id_token': id_token})}"
        )
        if (
            token_info.get("aud") != client_id
            or token_info.get("iss") not in {"accounts.google.com", "https://accounts.google.com"}
            or token_info.get("email_verified") not in {True, "true"}
            or not token_info.get("sub")
        ):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Google identity verification failed.")
        return str(token_info["sub"])

    version = os.getenv("FACEBOOK_GRAPH_API_VERSION", "v24.0")
    token_url = f"https://graph.facebook.com/{version}/oauth/access_token?{urlencode({
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': callback_url,
        'code': code,
    })}"
    tokens = oauth_json_request(token_url)
    access_token = tokens.get("access_token")
    if not isinstance(access_token, str):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Facebook did not return an access token.")
    profile_url = f"https://graph.facebook.com/{version}/me?{urlencode({
        'fields': 'id',
        'access_token': access_token,
    })}"
    profile = oauth_json_request(profile_url)
    subject = profile.get("id")
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Facebook identity verification failed.")
    return str(subject)


def get_or_create_social_user(db: Session, provider: str, provider_user_id: str) -> User:
    social_account = db.scalar(
        select(SocialAccount).where(
            SocialAccount.provider == provider,
            SocialAccount.provider_user_id == provider_user_id,
        )
    )
    if social_account is not None:
        return social_account.user

    username = f"{provider}_{secrets.token_hex(10)}"
    salt = secrets.token_bytes(16)
    user = User(
        username=username,
        password_salt=salt.hex(),
        password_hash=hash_password(secrets.token_urlsafe(48), salt).hex(),
    )
    db.add(user)
    try:
        db.flush()
        db.add(SocialAccount(user_id=user.id, provider=provider, provider_user_id=provider_user_id))
        db.commit()
    except IntegrityError:
        db.rollback()
        social_account = db.scalar(
            select(SocialAccount).where(
                SocialAccount.provider == provider,
                SocialAccount.provider_user_id == provider_user_id,
            )
        )
        if social_account is not None:
            return social_account.user
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Could not create the social account.") from None
    db.refresh(user)
    return user


@app.get("/api/auth/{provider}/callback")
def social_login_callback(provider: str, request_obj: Request, db: DbSession) -> Response:
    received_state = request_obj.query_params.get("state", "")
    state_parts = received_state.split(".", 2)
    mobile = len(state_parts) == 3 and state_parts[0] == "android"
    code_challenge = state_parts[2] if mobile else None
    client_id, client_secret = oauth_provider_settings(provider)
    base_url = oauth_base_url()
    if not client_id or not client_secret or not base_url:
        return oauth_error_redirect(provider, "provider_not_configured", mobile)

    state_cookie = oauth_state_cookie(provider)
    expected_state = request_obj.cookies.get(state_cookie)
    if not expected_state or not hmac.compare_digest(expected_state, received_state):
        return oauth_error_redirect(provider, "oauth_failed", mobile)
    if mobile and (code_challenge is None or not re.fullmatch(r"[A-Za-z0-9_-]{43,128}", code_challenge)):
        return oauth_error_redirect(provider, "oauth_failed", True)
    if request_obj.query_params.get("error") or not request_obj.query_params.get("code"):
        return oauth_error_redirect(provider, "oauth_failed", mobile)

    try:
        subject = get_social_subject(
            provider,
            request_obj.query_params["code"],
            oauth_callback_url(provider, base_url),
        )
    except HTTPException:
        return oauth_error_redirect(provider, "oauth_failed", mobile)

    user = get_or_create_social_user(db, provider, subject)
    if mobile:
        code = secrets.token_urlsafe(32)
        db.add(
            MobileOAuthHandoff(
                code_hash=token_digest(code),
                code_challenge=code_challenge,
                user_id=user.id,
                expires_at=datetime.utcnow() + MOBILE_OAUTH_HANDOFF_DURATION,
            )
        )
        db.commit()
        response = RedirectResponse(
            url=f"{MOBILE_REDIRECT_URI}?{urlencode({'code': code})}",
            status_code=status.HTTP_303_SEE_OTHER,
        )
    else:
        response = RedirectResponse(url="/?social_login=success", status_code=status.HTTP_303_SEE_OTHER)
    response.delete_cookie(key=state_cookie, path=f"/api/auth/{provider}/callback", httponly=True, samesite="lax")
    if not mobile:
        create_session(db, user, response)
    return response


@app.post("/api/auth/mobile/oauth/exchange", response_model=MobileAuthResponse)
def exchange_mobile_oauth(payload: MobileOAuthExchange, db: DbSession) -> MobileAuthResponse:
    handoff = db.get(MobileOAuthHandoff, token_digest(payload.code))
    if handoff is None or handoff.expires_at <= datetime.utcnow():
        if handoff is not None:
            db.delete(handoff)
            db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Sign-in code is invalid or expired.")

    verifier_digest = base64.urlsafe_b64encode(
        hashlib.sha256(payload.code_verifier.encode("ascii")).digest()
    ).rstrip(b"=").decode("ascii")
    if not hmac.compare_digest(handoff.code_challenge, verifier_digest):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Sign-in code verification failed.")

    user = db.get(User, handoff.user_id)
    db.delete(handoff)
    if user is None:
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The account is no longer available.")

    token = create_session(db, user)
    return MobileAuthResponse(username=user.username, access_token=token)


def build_gemini_prompt(language: str, message: str) -> str:
    if language == "ar":
        return (
            "أنت مساعد إسعافات أولية موثوق. أجب باللغة العربية بإرشادات كاملة وواضحة وخطوات عملية مرتبة، "
            "ولا تختصر الإجابة إلى سطرين. استخدم نصًا عاديًا وقائمة خطوات مرقمة دون تنسيق Markdown. "
            "اذكر متى يجب طلب الرعاية الطبية، ولا تقدم تشخيصًا نهائيًا. "
            "في النزيف الشديد أو الحالة المهددة للحياة، اجعل أول خطوة عملية الاتصال فورًا بالإسعاف ١٢٣ في مصر، "
            "ولا تطلب الانتظار قبل الاتصال. قدم إسعافات أولية أساسية موثوقة فقط ولا تخترع خطوات أو أرقامًا. "
            "رقم الإسعاف في مصر هو ١٢٣؛ لا تذكر ٩١١ أو رقم دولة أخرى إلا إذا حدد المستخدم بلدًا آخر. "
            "سيظهر تنبيه الطوارئ قبل إجابتك؛ لا تكرره. هذه إرشادات أولية وليست بديلاً عن الطبيب.\n\n"
            f"السؤال/الوصف: {message}"
        )
    if language == "es":
        return (
            "Eres un asistente fiable de primeros auxilios. Responde en español con orientación completa, clara y pasos prácticos ordenados; "
            "no reduzcas la respuesta a dos líneas. Usa texto simple y una lista numerada, sin formato Markdown. "
            "Indica cuándo buscar atención médica y no des un diagnóstico definitivo. "
            "Ante una hemorragia grave o una emergencia potencialmente mortal, el primer paso práctico es llamar inmediatamente al 123 en Egipto; no indiques esperar antes de llamar. "
            "Da solo primeros auxilios básicos y fiables; no inventes pasos ni números. "
            "El número de ambulancia en Egipto es 123; no menciones 911 ni otro número salvo que el usuario indique otro país. "
            "La respuesta irá precedida por una alerta de emergencia; no la repitas. Esto es orientación inicial, no sustituye a un profesional.\n\n"
            f"Pregunta/descripcion: {message}"
        )
    return (
        "You are a reliable first-aid assistant. Give complete, clear, practical step-by-step guidance; do not limit your answer to two lines. "
        "Use plain text and numbered steps, without Markdown formatting. Explain when professional medical care is needed and do not give a definitive diagnosis. "
        "For severe bleeding or a life-threatening emergency, the first practical step is to call 123 immediately in Egypt; never tell the user to wait before calling. "
        "Give only reliable basic first aid; do not invent steps or numbers. "
        "The ambulance number in Egypt is 123; do not substitute 911 or another country's number unless the user specifies another country. "
        "An emergency alert will appear before your response, so do not repeat it. This is first-aid guidance, not a substitute for a clinician.\n\n"
        f"Question/description: {message}"
    )


def emergency_notice(language: str) -> str:
    notices = {
        "ar": "🚨 إذا كانت الحالة طارئة أو تهدد الحياة، اتصل بالإسعاف ١٢٣ الآن في مصر، أو برقم الطوارئ المحلي خارج مصر.",
        "es": "🚨 Si es una emergencia o puede poner en peligro la vida, llama ahora al 123 en Egipto o al número local de emergencias.",
    }
    return notices.get(
        language,
        "🚨 If this is an emergency or may be life-threatening, call 123 now in Egypt or your local emergency number.",
    )


def generate_gemini_content(api_key: str, contents: list[dict], preferred_model: str) -> tuple[dict, str]:
    fallback_model = "gemini-flash-lite-latest" if preferred_model != "gemini-flash-lite-latest" else "gemini-3.5-flash"
    models = (preferred_model, fallback_model)
    request_body = {
        "contents": contents,
        "generationConfig": {
            "temperature": 0.4,
            "topP": 0.9,
            "maxOutputTokens": 3000,
        },
    }
    payload_data = json.dumps(request_body).encode("utf-8")
    unavailable = False

    for model in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        req = request.Request(url, data=payload_data, headers={"Content-Type": "application/json"}, method="POST")
        try:
            with request.urlopen(req, timeout=45) as response:
                return json.loads(response.read().decode("utf-8")), model
        except error.HTTPError as exc:
            if exc.code == 503:
                unavailable = True
                continue
            details = exc.read().decode("utf-8", errors="replace")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Gemini request failed: {details}",
            ) from exc
        except json.JSONDecodeError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Gemini returned an invalid response.",
            ) from exc
        except (error.URLError, TimeoutError) as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Could not reach Gemini API.",
            ) from exc

    if unavailable:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Gemini is temporarily unavailable. Please try again.",
        )
    raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Gemini returned no response.")


def call_gemini(payload: AssistantRequest) -> str:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Missing GEMINI_API_KEY or GOOGLE_API_KEY environment variable.",
        )

    prompt = build_gemini_prompt(payload.language, payload.message or "Describe the injury and symptoms.")
    content_parts = [{"text": prompt}]

    if payload.image_data and payload.image_mime_type:
        try:
            decoded = base64.b64decode(payload.image_data, validate=True)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data.") from exc
        content_parts.append({
            "inline_data": {
                "mime_type": payload.image_mime_type,
                "data": payload.image_data,
            }
        })

    body, model = generate_gemini_content(api_key, [{"parts": content_parts}], "gemini-3.5-flash")

    try:
        candidate = body["candidates"][0]
        answer = "".join(part["text"] for part in candidate["content"]["parts"] if "text" in part).strip()
        if not answer:
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Gemini returned no usable content.")

        for _ in range(2):
            if candidate.get("finishReason") != "MAX_TOKENS":
                break
            continuation_prompts = {
                "ar": "أكمل الإجابة من حيث توقفت دون تكرار ما سبق. أكمل الجملة غير المكتملة واذكر بقية الخطوات والتحذيرات الضرورية.",
                "es": "Continúa exactamente donde terminó la respuesta, sin repetir lo anterior. Completa la frase y añade los pasos y señales de alarma que falten.",
            }
            continuation = continuation_prompts.get(
                payload.language,
                "Continue exactly where the response ended without repeating previous text. Finish the incomplete sentence and provide any remaining necessary steps and warning signs.",
            )
            body, model = generate_gemini_content(
                api_key,
                [
                    {"role": "user", "parts": content_parts},
                    {"role": "model", "parts": [{"text": answer}]},
                    {"role": "user", "parts": [{"text": continuation}]},
                ],
                model,
            )
            candidate = body["candidates"][0]
            continuation_text = "".join(
                part["text"] for part in candidate["content"]["parts"] if "text" in part
            ).strip()
            if not continuation_text:
                raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Gemini returned no continuation.")
            answer = f"{answer.rstrip()}\n{continuation_text}"

        if candidate.get("finishReason") == "MAX_TOKENS":
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="The assistant response exceeded its limit. Please ask a more focused question.",
            )

        return f"{emergency_notice(payload.language)}\n\n{answer}"
    except (KeyError, IndexError, TypeError) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unexpected Gemini response format.",
        ) from exc


@app.post("/api/assistant/ask", response_model=AssistantResponse)
def ask_assistant(payload: AssistantRequest) -> AssistantResponse:
    if not payload.message.strip() and not payload.image_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please provide a message or image.")
    answer = call_gemini(payload)
    return AssistantResponse(answer=answer)


@app.get("/service-worker.js", include_in_schema=False)
def service_worker() -> FileResponse:
    return FileResponse(
        Path(__file__).resolve().parent / "static" / "service-worker.js",
        media_type="application/javascript",
    )


app.mount("/", StaticFiles(directory=Path(__file__).resolve().parent / "static", html=True), name="static")
