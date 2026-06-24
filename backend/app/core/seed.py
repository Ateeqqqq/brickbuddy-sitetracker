from datetime import date
import json

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models import CompanySettings, DailyUpdate, Photo, Project, Report, TeamMember, User
from app.core.security import hash_password


def seed_data() -> None:
    db: Session = SessionLocal()
    try:
        if not db.query(User).first():
            user = User(
                name="Ateeq Malik",
                email="admin@brickbuddy.com",
                company="BrickBuddy Construction",
                password_hash=hash_password("password"),
                role="Admin",
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            db.add(
                CompanySettings(
                    user_id=user.id,
                    name=user.name,
                    email=user.email,
                    company=user.company,
                    phone="(555) 555-0124",
                    timezone="Asia/Calcutta",
                    notifications_json=json.dumps(
                        {
                            "daily_update_reminders": True,
                            "delayed_project_alerts": True,
                            "weekly_report_summaries": True,
                            "photo_upload_notifications": True,
                        }
                    ),
                )
            )

        if not db.query(Project).first():
            projects = [
                Project(
                    name="Palm Heights Residential Tower",
                    client="Palm Realty Group",
                    location="Austin, TX",
                    manager="Maya Chen",
                    status="Active",
                    priority="High",
                    progress=68,
                    start_date=date(2026, 1, 8),
                    due_date=date(2026, 9, 25),
                    budget="$12.4M",
                    description="18-floor residential tower with podium parking, amenity deck, and retail frontage.",
                ),
                Project(
                    name="Northline Logistics Warehouse",
                    client="Northline Distribution",
                    location="Columbus, OH",
                    manager="Jordan Ellis",
                    status="Delayed",
                    priority="High",
                    progress=42,
                    start_date=date(2026, 2, 14),
                    due_date=date(2026, 8, 18),
                    budget="$8.1M",
                    description="Pre-engineered warehouse with cold storage zones and truck dock expansion.",
                ),
                Project(
                    name="Civic School Renovation",
                    client="Civic County Schools",
                    location="Raleigh, NC",
                    manager="Sofia Martinez",
                    status="Active",
                    priority="Medium",
                    progress=76,
                    start_date=date(2025, 11, 21),
                    due_date=date(2026, 7, 30),
                    budget="$5.7M",
                    description="Classroom modernization, HVAC replacement, cafeteria expansion, and accessibility upgrades.",
                ),
            ]
            db.add_all(projects)
            db.commit()

        if not db.query(DailyUpdate).first():
            project = db.query(Project).first()
            if project:
                db.add(
                    DailyUpdate(
                        project_id=project.id,
                        project_name=project.name,
                        date=date(2026, 6, 14),
                        progress=68,
                        completed_work="Level 12 slab pour completed. Elevator shaft formwork advanced to Level 14.",
                        issues="Concrete delivery window slipped by 45 minutes due to traffic restrictions.",
                        tomorrow_plan="Begin Level 13 column rebar and continue MEP sleeves inspection.",
                        author="Diego Ramos",
                    )
                )
                db.commit()

        if not db.query(Photo).first():
            project = db.query(Project).first()
            if project:
                db.add(
                    Photo(
                        project_id=project.id,
                        project_name=project.name,
                        title="Level 12 slab pour",
                        date=date(2026, 6, 14),
                        uploaded_by="Diego Ramos",
                        category="Structure",
                        image_url="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
                    )
                )
                db.commit()

        if not db.query(Report).first():
            project = db.query(Project).first()
            db.add(
                Report(
                    title="May Portfolio Summary",
                    type="Monthly",
                    project_name=project.name if project else "All Projects",
                    period="May 2026",
                    status="Ready",
                )
            )
            db.commit()

        if not db.query(TeamMember).first():
            db.add(
                TeamMember(
                    name="Maya Chen",
                    email="maya@brickbuddy.com",
                    role="Project Manager",
                    status="Active",
                    assigned_projects="Palm Heights Residential Tower, Riverfront Medical Clinic",
                    phone="(512) 555-0114",
                )
            )
            db.commit()
    finally:
        db.close()
