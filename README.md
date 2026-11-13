# دكتور الإنقاذ

Mobile-friendly first-aid guide in Arabic, English, and Spanish, with an offline PWA shell, emergency call shortcut, voice-to-guide lookup, spoken instructions, Gemini image/text assistance, and optional user accounts.

The built-in guide is available without an account or internet after the first visit. The AI assistant sends text and optional injury photos to Gemini for first-aid guidance; Gemini responses are not a medical diagnosis. Do not send identifying or sensitive information, and get consent before sharing another person's photo. The app does not save assistant photos or voice recordings. Voice lookup uses the browser's speech-recognition feature and may be processed by that browser's service. In Egypt, the ambulance number is 123; elsewhere use the local emergency number. The guide is not a substitute for emergency services or medical training.

Have the first-aid content and emergency contact information reviewed by qualified local professionals before sharing the app publicly.

## Run locally

Python 3.10 or later is recommended.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
# Add your keys to .env, then start the app:
uvicorn main:app --reload
```

Open http://127.0.0.1:8001. Put your Gemini API key in `GEMINI_API_KEY` in the project-root `.env` file. The app loads that file when the server starts; already-set process environment variables take precedence, so remove an old PowerShell variable or restart from a clean terminal if necessary. Restart the server after changing `.env`. Keep `.env` private and never commit or share it. SQLite data is stored in `doctor_rescate.db`.

The AI assistant uses Gemini for text or image-based first-aid triage. Set `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) before starting the app. Without it, the assistant will return a clear error message instead of attempting a call.

Social sign-in requires OAuth credentials from Google and/or Meta; the buttons cannot work until those providers are configured. Add the values to the matching fields in `.env`, then restart the app. Set each callback URL in the provider console and use the exact same origin in `PUBLIC_BASE_URL`:

- Google: `http://127.0.0.1:8001/api/auth/google/callback`
- Facebook: `http://127.0.0.1:8001/api/auth/facebook/callback`

Google needs a Web application OAuth client. Facebook Login should allow the `public_profile` permission and the callback URL above. Social users are identified by their provider ID; accounts are not automatically linked by email. When deploying over HTTPS, set `PUBLIC_BASE_URL` to the deployed origin and `COOKIE_SECURE=true`. Social sign-in stays unavailable until the corresponding provider ID and secret are configured.

## Deploy to Vercel with Supabase

Vercel detects the FastAPI app in `main.py`; `vercel.json` sets a 60-second function limit. Import the project repository into Vercel and configure the environment variables before deploying. Vercel Hobby is a recurring free plan with monthly usage caps, not a guaranteed 90-day trial. Its terms limit Hobby use to personal or non-commercial projects and permit submitted content to be used for AI model training. Review those terms before connecting a repository.

Vercel Functions do not provide durable local SQLite storage, so configure a Supabase Postgres database before enabling account registration. Supabase Free includes 500 MB and may pause projects after seven days of inactivity; paused projects can be restored. In Vercel's project settings, set these environment variables without committing values to source control:

- `DATABASE_URL`: use Supabase's shared pooler connection string with SQLAlchemy's `postgresql+psycopg://` driver prefix and `sslmode=require`.
- `PUBLIC_BASE_URL`: the exact Vercel HTTPS origin assigned to the project.
- `COOKIE_SECURE`: `true`.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: set as private environment variables.
- `GEMINI_API_KEY`: optional; set privately if the AI assistant should be enabled.

After Vercel assigns the project URL, set it as `PUBLIC_BASE_URL` and add `https://your-project.vercel.app/api/auth/google/callback` to the Google OAuth client's authorized redirect URIs. The exact hostname must match `PUBLIC_BASE_URL`. Keep credentials out of the repository and enter them only in Vercel's private environment-variable settings. Do not deploy the previously exposed OAuth secret; replace it before making the app public.

The app has not been deployed yet. The local project must be connected to a Vercel account and a Supabase database before it has a public backend URL. Review the first-aid content and emergency contact information with qualified local professionals before a public launch.

The guide and AI answers can be read aloud using your browser's installed speech voices. Keep device media volume on; the app uses the selected language's voice when available.

PostgreSQL support uses the `psycopg` driver listed in `requirements.txt`. Set `DATABASE_URL` to a SQLAlchemy URL such as `postgresql+psycopg://user:password@host/database`.
