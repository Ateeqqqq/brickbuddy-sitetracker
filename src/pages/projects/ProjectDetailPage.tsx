import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { ProjectStatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { dailyUpdates, photos, projects } from "../../data/mockData";
import { formatDate, initials } from "../../utils/format";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const projectUpdates = dailyUpdates.filter((update) => update.projectId === project.id);
  const projectPhotos = photos.filter((photo) => photo.projectId === project.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.name}
        description={project.description}
        actions={
          <Link to="/app/projects">
            <Button variant="outline" icon={<ArrowLeft size={18} />}>Back to Projects</Button>
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card title="Project Information">
          <div className="space-y-5 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ProjectStatusBadge status={project.status} />
              <span className="text-sm font-semibold text-ink">{project.progress}% complete</span>
            </div>
            <ProgressBar value={project.progress} />
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-normal text-ink-muted">Client</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-normal text-ink-muted">Budget</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{project.budget}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-ink-muted"><MapPin size={14} /> Location</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{project.location}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-ink-muted"><CalendarDays size={14} /> Schedule</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{formatDate(project.startDate)} - {formatDate(project.dueDate)}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card title="Assigned Team" description={`${project.team.length} members assigned`}>
          <div className="divide-y divide-line">
            {project.team.map((member) => (
              <div key={member} className="flex items-center gap-3 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  {initials(member)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{member}</p>
                  <p className="text-sm text-ink-muted">{member === project.manager ? "Project Manager" : "Site Team"}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card title="Progress Timeline">
          <div className="space-y-4 p-5">
            {["Planning approved", "Foundation completed", "Structure in progress", "MEP coordination"].map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-ink">{item}</p>
                  <p className="mt-1 text-sm text-ink-muted">{index < 2 ? "Completed" : "Current milestone"}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Site Updates" description="Latest notes for this project">
          <div className="divide-y divide-line">
            {projectUpdates.length ? (
              projectUpdates.map((update) => (
                <article key={update.id} className="px-5 py-4">
                  <p className="font-semibold text-ink">{formatDate(update.date)}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{update.completedWork}</p>
                  <p className="mt-2 text-sm font-medium text-ink">Tomorrow: {update.tomorrowPlan}</p>
                </article>
              ))
            ) : (
              <p className="px-5 py-6 text-sm text-ink-muted">No updates have been logged for this project yet.</p>
            )}
          </div>
        </Card>
      </div>

      <Card title="Photo Gallery">
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          {projectPhotos.length ? (
            projectPhotos.map((photo) => (
              <figure key={photo.id} className="overflow-hidden rounded-lg border border-line bg-white">
                <img src={photo.imageUrl} alt={photo.title} className="h-40 w-full object-cover" />
                <figcaption className="p-3">
                  <p className="font-semibold text-ink">{photo.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{formatDate(photo.date)}</p>
                </figcaption>
              </figure>
            ))
          ) : (
            <div className="col-span-full flex min-h-32 items-center justify-center rounded-lg border border-dashed border-line text-sm text-ink-muted">
              No photos uploaded for this project.
            </div>
          )}
        </div>
      </Card>

      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <Users size={16} />
        <span>Project manager: {project.manager}</span>
      </div>
    </div>
  );
}
