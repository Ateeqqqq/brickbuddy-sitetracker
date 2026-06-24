from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models import CompanySettings, User
from app.schemas.auth import ForgotPasswordRequest, LoginRequest, RegisterRequest, TokenResponse, UserResponse

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        password_hash=hash_password(payload.password),
        role="Admin",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    settings_row = CompanySettings(
        user_id=user.id,
        name=user.name,
        email=user.email,
        company=user.company,
        phone="",
        timezone="Asia/Calcutta",
        notifications_json='{"daily_update_reminders": true, "delayed_project_alerts": true, "weekly_report_summaries": true, "photo_upload_notifications": true}',
    )
    db.add(settings_row)
    db.commit()

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return TokenResponse(access_token=create_access_token(str(user.id)))


@router.post("/forgot-password")
def forgot_password(_: ForgotPasswordRequest):
    return {"message": "Password reset link queued."}


@router.post("/logout")
def logout():
    return {"message": "Logged out"}


@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)):
    return current_user
