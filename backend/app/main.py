from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.routers import auth, health, photos, projects, reports, settings as settings_router, team, updates
from app.core.seed import seed_data


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="1.0.0")

    cors_origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins or ["http://localhost:5173", "http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router, prefix="/api", tags=["health"])
    app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
    app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
    app.include_router(updates.router, prefix="/api/updates", tags=["updates"])
    app.include_router(photos.router, prefix="/api/photos", tags=["photos"])
    app.include_router(reports.router, prefix="/api/reports", tags=["reports"])
    app.include_router(team.router, prefix="/api/team", tags=["team"])
    app.include_router(settings_router.router, prefix="/api/settings", tags=["settings"])

    @app.on_event("startup")
    def on_startup() -> None:
        Base.metadata.create_all(bind=engine)
        seed_data()

    return app


app = create_app()
