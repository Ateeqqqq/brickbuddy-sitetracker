from pydantic import EmailStr

from app.schemas.base import CamelModel


class RegisterRequest(CamelModel):
    name: str
    company: str
    email: EmailStr
    password: str


class LoginRequest(CamelModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(CamelModel):
    email: EmailStr


class TokenResponse(CamelModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(CamelModel):
    id: int
    name: str
    email: EmailStr
    company: str
    role: str
