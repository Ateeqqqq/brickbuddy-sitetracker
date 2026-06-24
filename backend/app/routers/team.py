from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import TeamMember
from app.schemas.team import TeamMemberCreate, TeamMemberResponse, TeamMemberUpdate

router = APIRouter()


@router.get("", response_model=list[TeamMemberResponse])
def list_team(db: Session = Depends(get_db)):
    return db.query(TeamMember).order_by(TeamMember.id.desc()).all()


@router.post("", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def create_member(payload: TeamMemberCreate, db: Session = Depends(get_db)):
    item = TeamMember(
        name=payload.name,
        email=payload.email,
        role=payload.role,
        status=payload.status,
        assigned_projects=",".join(payload.assigned_projects),
        phone=payload.phone,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{member_id}", response_model=TeamMemberResponse)
def update_member(member_id: int, payload: TeamMemberUpdate, db: Session = Depends(get_db)):
    item = db.get(TeamMember, member_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found")
    data = payload.model_dump(exclude_unset=True)
    if "assigned_projects" in data and data["assigned_projects"] is not None:
        data["assigned_projects"] = ",".join(data["assigned_projects"])
    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    item = db.get(TeamMember, member_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found")
    db.delete(item)
    db.commit()
