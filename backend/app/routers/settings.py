import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import CompanySettings, User
from app.schemas.settings import SettingsResponse, SettingsUpdate

router = APIRouter()


def _serialize(settings_row: CompanySettings) -> SettingsResponse:
    return SettingsResponse(
        id=settings_row.id,
        name=settings_row.name,
        email=settings_row.email,
        company=settings_row.company,
        phone=settings_row.phone,
        timezone=settings_row.timezone,
        notifications=json.loads(settings_row.notifications_json or "{}"),
    )


@router.get("/me", response_model=SettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    item = db.query(CompanySettings).order_by(CompanySettings.id.desc()).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings not found")
    return _serialize(item)


@router.patch("/me", response_model=SettingsResponse)
def update_settings(payload: SettingsUpdate, db: Session = Depends(get_db)):
    item = db.query(CompanySettings).order_by(CompanySettings.id.desc()).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings not found")
    data = payload.model_dump(exclude_unset=True)
    if "notifications" in data and data["notifications"] is not None:
        item.notifications_json = json.dumps(data.pop("notifications"))
    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return _serialize(item)
