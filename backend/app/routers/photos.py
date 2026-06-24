from datetime import date
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Photo, Project
from app.schemas.photo import PhotoResponse

router = APIRouter()


@router.get("", response_model=list[PhotoResponse])
def list_photos(db: Session = Depends(get_db)):
    return db.query(Photo).order_by(Photo.id.desc()).all()


@router.post("", response_model=PhotoResponse, status_code=status.HTTP_201_CREATED)
async def upload_photo(
    project_id: int = Form(...),
    project_name: str | None = Form(None, alias="projectName"),
    title: str = Form(...),
    date_value: date = Form(..., alias="date"),
    uploaded_by: str = Form(...),
    category: str = Form(...),
    image_url: str | None = Form(None, alias="imageUrl"),
    file: UploadFile | None = File(None, alias="photoFile"),
    db: Session = Depends(get_db),
):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project not found")
    resolved_project_name = project_name or project.name

    resolved_url = image_url or "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80"
    if file:
        content = await file.read()
        if content:
            resolved_url = f"uploaded:{file.filename}"

    item = Photo(
        project_id=project_id,
        project_name=resolved_project_name,
        title=title,
        date=date_value,
        uploaded_by=uploaded_by,
        category=category,
        image_url=resolved_url,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    item = db.get(Photo, photo_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found")
    db.delete(item)
    db.commit()
