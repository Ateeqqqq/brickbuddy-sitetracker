from datetime import date
from app.schemas.base import CamelModel


class ProjectBase(CamelModel):
    name: str
    client: str
    location: str
    manager: str
    status: str
    priority: str
    progress: float = 0
    start_date: date
    due_date: date
    budget: str
    description: str


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(CamelModel):
    name: str | None = None
    client: str | None = None
    location: str | None = None
    manager: str | None = None
    status: str | None = None
    priority: str | None = None
    progress: float | None = None
    start_date: date | None = None
    due_date: date | None = None
    budget: str | None = None
    description: str | None = None


class ProjectResponse(ProjectBase):
    id: int
