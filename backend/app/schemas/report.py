from datetime import datetime

from app.schemas.base import CamelModel


class ReportBase(CamelModel):
    title: str
    type: str
    project_name: str
    period: str
    status: str = "Ready"


class ReportCreate(CamelModel):
    type: str
    period: str
    project_id: int | None = None


class ReportResponse(ReportBase):
    id: int
    generated_at: datetime
