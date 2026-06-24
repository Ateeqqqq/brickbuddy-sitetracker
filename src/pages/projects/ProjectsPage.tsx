import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { ProjectStatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField, TextArea, TextField } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { projects as seedProjects } from "../../data/mockData";
import type { Priority, Project, ProjectStatus } from "../../types";
import { formatDate } from "../../utils/format";

type ProjectForm = Omit<Project, "id" | "team"> & { team: string };

const emptyProject: ProjectForm = {
  name: "",
  client: "",
  location: "",
  manager: "",
  status: "Planning",
  priority: "Medium",
  progress: 0,
  startDate: "2026-06-15",
  dueDate: "2026-12-31",
  budget: "",
  team: "",
  description: "",
};

export function ProjectsPage() {
  const [projectList, setProjectList] = useState<Project[]>(seedProjects);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>({ defaultValues: emptyProject });

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchesQuery = `${project.name} ${project.client} ${project.location} ${project.manager}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = status === "All" || project.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [projectList, query, status]);

  const openCreate = () => {
    setEditingProject(null);
    reset(emptyProject);
    setIsModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    reset({ ...project, team: project.team.join(", ") });
    setIsModalOpen(true);
  };

  const onSubmit = handleSubmit((values) => {
    const nextProject: Project = {
      ...values,
      id: editingProject?.id ?? `p-${Date.now()}`,
      progress: Number(values.progress),
      team: values.team.split(",").map((member) => member.trim()).filter(Boolean),
      status: values.status as ProjectStatus,
      priority: values.priority as Priority,
    };

    setProjectList((current) =>
      editingProject ? current.map((project) => (project.id === editingProject.id ? nextProject : project)) : [nextProject, ...current],
    );
    setIsModalOpen(false);
  });

  const deleteProject = (id: string) => {
    setProjectList((current) => current.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Create, update, filter, and review construction projects across all active sites."
        actions={<Button icon={<Plus size={18} />} onClick={openCreate}>Create Project</Button>}
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-line p-5 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={17} />
            <input
              className="focus-ring h-10 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm text-ink"
              placeholder="Search projects"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select
            className="focus-ring h-10 rounded-md border border-line bg-white px-3 text-sm text-ink"
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus | "All")}
          >
            <option value="All">All Statuses</option>
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs font-semibold uppercase tracking-normal text-ink-muted">
              <tr>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Manager</th>
                <th className="px-5 py-3">Progress</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="bg-white">
                  <td className="px-5 py-4">
                    <Link to={`/app/projects/${project.id}`} className="font-semibold text-primary hover:text-primary-hover">
                      {project.name}
                    </Link>
                    <p className="mt-1 text-xs text-ink-muted">{project.location}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{project.client}</td>
                  <td className="px-5 py-4 text-ink-muted">{project.manager}</td>
                  <td className="px-5 py-4">
                    <div className="flex min-w-40 items-center gap-3">
                      <ProgressBar value={project.progress} />
                      <span className="w-10 text-right font-semibold text-ink">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{formatDate(project.dueDate)}</td>
                  <td className="px-5 py-4"><ProjectStatusBadge status={project.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" className="h-9 w-9 px-0" onClick={() => openEdit(project)} aria-label={`Edit ${project.name}`}>
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" className="h-9 w-9 px-0 text-danger" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.name}`}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal title={editingProject ? "Edit Project" : "Create Project"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <TextField label="Project name" error={errors.name?.message} {...register("name", { required: "Project name is required" })} />
          <TextField label="Client" error={errors.client?.message} {...register("client", { required: "Client is required" })} />
          <TextField label="Location" error={errors.location?.message} {...register("location", { required: "Location is required" })} />
          <TextField label="Manager" error={errors.manager?.message} {...register("manager", { required: "Manager is required" })} />
          <SelectField label="Status" {...register("status")}>
            <option>Planning</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Delayed</option>
            <option>On Hold</option>
          </SelectField>
          <SelectField label="Priority" {...register("priority")}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </SelectField>
          <TextField label="Progress %" type="number" min={0} max={100} {...register("progress", { valueAsNumber: true })} />
          <TextField label="Budget" placeholder="$4.2M" {...register("budget")} />
          <TextField label="Start date" type="date" {...register("startDate")} />
          <TextField label="Due date" type="date" {...register("dueDate")} />
          <TextField className="md:col-span-2" label="Team members" placeholder="Maya Chen, Diego Ramos" {...register("team")} />
          <TextArea className="md:col-span-2" label="Description" {...register("description")} />
          <div className="flex justify-end gap-2 md:col-span-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingProject ? "Save Changes" : "Create Project"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
