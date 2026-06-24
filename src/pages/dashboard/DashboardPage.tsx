import { Activity, AlertTriangle, Building2, CheckCircle2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ProjectStatusBadge } from "../../components/StatusBadge";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { StatCard } from "../../components/ui/StatCard";
import { dailyUpdates, deadlines, progressOverview, projects, weeklyActivity } from "../../data/mockData";
import { formatDate } from "../../utils/format";

export function DashboardPage() {
  const total = projects.length;
  const active = projects.filter((project) => project.status === "Active").length;
  const completed = projects.filter((project) => project.status === "Completed").length;
  const delayed = projects.filter((project) => project.status === "Delayed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A clear daily view of project health, activity, deadlines, and recent site updates."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={String(total)} hint="Across your construction portfolio" icon={<Building2 size={21} />} />
        <StatCard label="Active Projects" value={String(active)} hint="Currently under execution" icon={<Activity size={21} />} />
        <StatCard label="Completed Projects" value={String(completed)} hint="Handed over successfully" icon={<CheckCircle2 size={21} />} />
        <StatCard label="Delayed Projects" value={String(delayed)} hint="Need schedule attention" icon={<AlertTriangle size={21} />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Project Progress Overview" description="Average completion across construction phases">
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressOverview}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1877F2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Weekly Activity" description="Daily update and photo volume">
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="updates" stroke="#1877F2" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="photos" stroke="#22C55E" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Recent Updates" description="Latest field notes and site progress">
          <div className="divide-y divide-line">
            {dailyUpdates.map((update) => (
              <article key={update.id} className="px-5 py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">{update.projectName}</p>
                    <p className="mt-1 text-sm leading-6 text-ink-muted">{update.completedWork}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{update.progress}%</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-ink-muted">
                  <span>{formatDate(update.date)}</span>
                  <span>{update.author}</span>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Deadlines" description="Near-term milestones to watch">
          <div className="divide-y divide-line">
            {deadlines.map((deadline) => (
              <article key={deadline.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{deadline.label}</p>
                    <p className="mt-1 text-sm text-ink-muted">{deadline.projectName}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{deadline.status}</span>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{formatDate(deadline.dueDate)}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Portfolio Snapshot" description="Current progress and status by project">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs font-semibold uppercase tracking-normal text-ink-muted">
              <tr>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Manager</th>
                <th className="px-5 py-3">Progress</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map((project) => (
                <tr key={project.id} className="bg-white">
                  <td className="px-5 py-4 font-semibold text-ink">{project.name}</td>
                  <td className="px-5 py-4 text-ink-muted">{project.manager}</td>
                  <td className="px-5 py-4">
                    <div className="flex min-w-40 items-center gap-3">
                      <ProgressBar value={project.progress} />
                      <span className="w-10 text-right font-semibold text-ink">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{formatDate(project.dueDate)}</td>
                  <td className="px-5 py-4"><ProjectStatusBadge status={project.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
