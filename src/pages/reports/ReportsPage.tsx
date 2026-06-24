import { useState } from "react";
import { Download, FileText, Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField, TextField } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { reports as seedReports, projects } from "../../data/mockData";
import type { Report } from "../../types";
import { formatDate } from "../../utils/format";

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [isOpen, setIsOpen] = useState(false);

  const generateReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectId = String(formData.get("projectId"));
    const project = projects.find((item) => item.id === projectId);
    const type = String(formData.get("type")) as Report["type"];
    const period = String(formData.get("period"));
    setReports((current) => [
      {
        id: `r-${Date.now()}`,
        title: `${project?.name ?? "Portfolio"} ${type} Report`,
        type,
        projectName: project?.name ?? "All Projects",
        period,
        generatedAt: "2026-06-15",
        status: "Draft",
      },
      ...current,
    ]);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Prepare weekly, monthly, and project-level reports for owners, contractors, and leadership reviews."
        actions={<Button icon={<Plus size={18} />} onClick={() => setIsOpen(true)}>Generate Report</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {["Weekly Reports", "Monthly Reports", "Project Reports"].map((label) => (
          <section key={label} className="rounded-lg border border-line bg-white p-5 shadow-panel">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary">
              <FileText size={20} />
            </div>
            <p className="mt-4 text-lg font-semibold text-ink">{label}</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Standardized summaries ready for future PDF generation.</p>
          </section>
        ))}
      </div>

      <Card title="Report Library" description="Generated and draft reports">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs font-semibold uppercase tracking-normal text-ink-muted">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Period</th>
                <th className="px-5 py-3">Generated</th>
                <th className="px-5 py-3 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {reports.map((report) => (
                <tr key={report.id} className="bg-white">
                  <td className="px-5 py-4 font-semibold text-ink">{report.title}</td>
                  <td className="px-5 py-4 text-ink-muted">{report.type}</td>
                  <td className="px-5 py-4 text-ink-muted">{report.projectName}</td>
                  <td className="px-5 py-4 text-ink-muted">{report.period}</td>
                  <td className="px-5 py-4 text-ink-muted">{formatDate(report.generatedAt)}</td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="outline" icon={<Download size={16} />}>Generate PDF</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal title="Generate Report" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="grid gap-4" onSubmit={generateReport}>
          <SelectField label="Report Type" name="type">
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Project</option>
          </SelectField>
          <SelectField label="Project" name="projectId">
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </SelectField>
          <TextField label="Period" name="period" placeholder="Jun 15 - Jun 21, 2026" required />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
