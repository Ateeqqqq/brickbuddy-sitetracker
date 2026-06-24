import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField, TextArea, TextField } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { dailyUpdates as seedUpdates, projects } from "../../data/mockData";
import type { DailyUpdate } from "../../types";
import { formatDate } from "../../utils/format";

type UpdateForm = Omit<DailyUpdate, "id" | "projectName">;

export function DailyUpdatesPage() {
  const [updates, setUpdates] = useState<DailyUpdate[]>(seedUpdates);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<UpdateForm>({
    defaultValues: {
      projectId: projects[0].id,
      date: "2026-06-15",
      progress: 50,
      completedWork: "",
      issues: "",
      tomorrowPlan: "",
      author: "Ateeq Malik",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const project = projects.find((item) => item.id === values.projectId) ?? projects[0];
    setUpdates((current) => [
      {
        ...values,
        id: `u-${Date.now()}`,
        progress: Number(values.progress),
        projectName: project.name,
      },
      ...current,
    ]);
    setIsOpen(false);
    reset();
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily Updates"
        description="Log site progress, issues, completed work, and tomorrow plans for every active project."
        actions={<Button icon={<Plus size={18} />} onClick={() => setIsOpen(true)}>Create Daily Update</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card title="Progress Entry" description="Capture field updates in a consistent format">
          <form className="grid gap-4 p-5" onSubmit={onSubmit}>
            <SelectField label="Project" {...register("projectId")}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </SelectField>
            <TextField label="Date" type="date" {...register("date")} />
            <TextField label="Progress Percentage" type="number" min={0} max={100} {...register("progress", { valueAsNumber: true })} />
            <TextArea label="Completed Work" {...register("completedWork")} />
            <TextArea label="Issues" {...register("issues")} />
            <TextArea label="Tomorrow Plan" {...register("tomorrowPlan")} />
            <TextField label="Author" {...register("author")} />
            <Button type="submit">Save Update</Button>
          </form>
        </Card>

        <Card title="Update History" description="Recent updates from project teams">
          <div className="divide-y divide-line">
            {updates.map((update) => (
              <article key={update.id} className="px-5 py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-ink">{update.projectName}</p>
                    <p className="mt-1 text-sm text-ink-muted">{formatDate(update.date)} by {update.author}</p>
                  </div>
                  <div className="flex min-w-40 items-center gap-3">
                    <ProgressBar value={update.progress} />
                    <span className="w-10 text-right text-sm font-bold text-ink">{update.progress}%</span>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-ink-muted">Completed Work</p>
                    <p className="mt-2 text-sm leading-6 text-ink">{update.completedWork}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-ink-muted">Issues</p>
                    <p className="mt-2 text-sm leading-6 text-ink">{update.issues || "No issues reported."}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-normal text-ink-muted">Tomorrow Plan</p>
                    <p className="mt-2 text-sm leading-6 text-ink">{update.tomorrowPlan}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </div>

      <Modal title="Create Daily Update" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <SelectField label="Project" {...register("projectId")}>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </SelectField>
          <TextField label="Progress Percentage" type="number" min={0} max={100} {...register("progress", { valueAsNumber: true })} />
          <TextArea label="Completed Work" {...register("completedWork")} />
          <TextArea label="Issues" {...register("issues")} />
          <TextArea label="Tomorrow Plan" {...register("tomorrowPlan")} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Save Update</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
