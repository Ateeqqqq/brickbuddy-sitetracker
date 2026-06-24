from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer

from app.core.database import Base


class TimestampMixin:
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
