from pydantic import EmailStr, Field

from app.schemas.base import CamelModel


class TeamMemberBase(CamelModel):
    name: str
    email: EmailStr
    role: str
    status: str
    assigned_projects: list[str] = Field(default_factory=list)
    phone: str = ""


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(CamelModel):
    name: str | None = None
    email: EmailStr | None = None
    role: str | None = None
    status: str | None = None
    assigned_projects: list[str] | None = None
    phone: str | None = None


class TeamMemberResponse(TeamMemberBase):
    id: int
