from datetime import datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin


class DailyUpdate(TimestampMixin, Base):
    __tablename__ = "daily_updates"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False, index=True)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    progress: Mapped[float] = mapped_column(Float, default=0)
    completed_work: Mapped[str] = mapped_column(Text, nullable=False, default="")
    issues: Mapped[str] = mapped_column(Text, nullable=False, default="")
    tomorrow_plan: Mapped[str] = mapped_column(Text, nullable=False, default="")
    author: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
