import base64
import hashlib
import secrets
import unittest
from datetime import datetime, timedelta

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from starlette.requests import Request

import main
from database import Base
from models import MobileOAuthHandoff, User


class MobileAuthTests(unittest.TestCase):
    def setUp(self) -> None:
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(self.engine)
        self.session_factory = sessionmaker(bind=self.engine, expire_on_commit=False)
        self.db = self.session_factory()

    def tearDown(self) -> None:
        self.db.close()
        self.engine.dispose()

    def test_mobile_registration_issues_bearer_token(self) -> None:
        result = main.mobile_register(
            main.Credentials(username="native_user", password="long-enough-password"),
            self.db,
        )

        request = Request({
            "type": "http",
            "headers": [(b"authorization", f"Bearer {result.access_token}".encode("ascii"))],
        })
        current_user = main.get_current_user(request, self.db)

        self.assertEqual(result.username, current_user.username)
        self.assertEqual(result.token_type, "bearer")
        self.assertNotEqual(result.access_token, self.db.query(User).filter_by(username="native_user").one().password_hash)

    def test_oauth_handoff_requires_pkce_and_can_only_be_used_once(self) -> None:
        user = User(
            username="google_native",
            password_salt="00",
            password_hash="00",
        )
        self.db.add(user)
        self.db.commit()
        verifier = secrets.token_urlsafe(32)
        challenge = base64.urlsafe_b64encode(
            hashlib.sha256(verifier.encode("ascii")).digest()
        ).rstrip(b"=").decode("ascii")
        code = secrets.token_urlsafe(32)
        self.db.add(
            MobileOAuthHandoff(
                code_hash=main.token_digest(code),
                code_challenge=challenge,
                user_id=user.id,
                expires_at=datetime.utcnow() + timedelta(minutes=5),
            )
        )
        self.db.commit()

        with self.assertRaises(HTTPException) as wrong_verifier:
            main.exchange_mobile_oauth(
                main.MobileOAuthExchange(code=code, code_verifier=secrets.token_urlsafe(32)),
                self.db,
            )
        self.assertEqual(wrong_verifier.exception.status_code, 401)

        result = main.exchange_mobile_oauth(
            main.MobileOAuthExchange(code=code, code_verifier=verifier),
            self.db,
        )
        self.assertEqual(result.username, user.username)
        with self.assertRaises(HTTPException) as replay:
            main.exchange_mobile_oauth(
                main.MobileOAuthExchange(code=code, code_verifier=verifier),
                self.db,
            )
        self.assertEqual(replay.exception.status_code, 401)
