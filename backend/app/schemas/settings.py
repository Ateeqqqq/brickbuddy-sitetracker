from pydantic import EmailStr

from app.schemas.base import CamelModel


class SettingsResponse(CamelModel):
    id: int
    name: str
    email: EmailStr
    company: str
    phone: str
    timezone: str
    notifications: dict


class SettingsUpdate(CamelModel):
    name: str | None = None
    email: EmailStr | None = None
    company: str | None = None
    phone: str | None = None
    timezone: str | None = None
    notifications: dict | None = None
