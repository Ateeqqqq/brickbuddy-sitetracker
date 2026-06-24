from datetime import date
from app.schemas.base import CamelModel


class DailyUpdateBase(CamelModel):
    project_id: int
    project_name: str
    date: date
    progress: float = 0
    completed_work: str = ""
    issues: str = ""
    tomorrow_plan: str = ""
    author: str


class DailyUpdateCreate(DailyUpdateBase):
    pass


class DailyUpdateUpdate(CamelModel):
    project_id: int | None = None
    project_name: str | None = None
    date: date | None = None
    progress: float | None = None
    completed_work: str | None = None
    issues: str | None = None
    tomorrow_plan: str | None = None
    author: str | None = None


class DailyUpdateResponse(DailyUpdateBase):
    id: int
