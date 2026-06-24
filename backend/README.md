# BrickBuddy Backend

FastAPI + PostgreSQL + JWT backend for BrickBuddy SiteTracker.

## Run locally

1. Create a Python virtual environment.
2. Install dependencies from `requirements.txt`.
3. Set environment variables in `.env`.
4. Run:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Example env

```env
APP_NAME=BrickBuddy API
ENVIRONMENT=development
SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=480
DATABASE_URL=postgresql+psycopg://brickbuddy:brickbuddy@localhost:5432/brickbuddy
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
