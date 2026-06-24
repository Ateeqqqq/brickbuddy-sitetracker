from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import DailyUpdate, Project
from app.schemas.update import DailyUpdateCreate, DailyUpdateResponse, DailyUpdateUpdate

router = APIRouter()


@router.get("", response_model=list[DailyUpdateResponse])
def list_updates(db: Session = Depends(get_db)):
    return db.query(DailyUpdate).order_by(DailyUpdate.id.desc()).all()


@router.post("", response_model=DailyUpdateResponse, status_code=status.HTTP_201_CREATED)
def create_update(payload: DailyUpdateCreate, db: Session = Depends(get_db)):
    if not db.get(Project, payload.project_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project not found")
    item = DailyUpdate(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{update_id}", response_model=DailyUpdateResponse)
def update_update(update_id: int, payload: DailyUpdateUpdate, db: Session = Depends(get_db)):
    item = db.get(DailyUpdate, update_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Update not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{update_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_update(update_id: int, db: Session = Depends(get_db)):
    item = db.get(DailyUpdate, update_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Update not found")
    db.delete(item)
    db.commit()
