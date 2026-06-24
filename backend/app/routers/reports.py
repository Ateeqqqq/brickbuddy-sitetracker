from io import BytesIO
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Project, Report
from app.schemas.report import ReportCreate, ReportResponse

router = APIRouter()


@router.get("", response_model=list[ReportResponse])
def list_reports(db: Session = Depends(get_db)):
    return db.query(Report).order_by(Report.id.desc()).all()


@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def generate_report(payload: ReportCreate, db: Session = Depends(get_db)):
    project_name = "All Projects"
    if payload.project_id is not None:
        project = db.get(Project, payload.project_id)
        if not project:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project not found")
        project_name = project.name

    item = Report(
        title=f"{project_name} {payload.type} Report",
        type=payload.type,
        project_name=project_name,
        period=payload.period,
        status="Draft",
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/{report_id}/pdf")
def download_pdf(report_id: int, db: Session = Depends(get_db)):
    report = db.get(Report, report_id)
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle(report.title)
    pdf.drawString(72, 720, report.title)
    pdf.drawString(72, 700, f"Project: {report.project_name}")
    pdf.drawString(72, 680, f"Period: {report.period}")
    pdf.drawString(72, 660, f"Status: {report.status}")
    pdf.save()
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": f'attachment; filename="{report.title}.pdf"'})
