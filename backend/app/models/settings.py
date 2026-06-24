from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.base import TimestampMixin


class CompanySettings(TimestampMixin, Base):
    __tablename__ = "company_settings"

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, default="Ateeq Malik")
    email: Mapped[str] = mapped_column(String(255), nullable=False, default="admin@brickbuddy.com")
    company: Mapped[str] = mapped_column(String(255), nullable=False, default="BrickBuddy Construction")
    phone: Mapped[str] = mapped_column(String(50), nullable=False, default="")
    timezone: Mapped[str] = mapped_column(String(50), nullable=False, default="Asia/Calcutta")
    notifications_json: Mapped[str] = mapped_column(String(1000), nullable=False, default="{}")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
