from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "BrickBuddy API"
    environment: str = "development"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 480
    database_url: str = "postgresql+psycopg://brickbuddy:brickbuddy@localhost:5432/brickbuddy"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
