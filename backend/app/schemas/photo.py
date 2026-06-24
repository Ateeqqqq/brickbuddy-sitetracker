from datetime import date
from app.schemas.base import CamelModel


class PhotoBase(CamelModel):
    project_id: int
    project_name: str
    title: str
    date: date
    uploaded_by: str
    category: str
    image_url: str


class PhotoCreate(PhotoBase):
    pass


class PhotoResponse(PhotoBase):
    id: int
