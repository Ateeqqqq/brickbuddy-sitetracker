import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { MemberStatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField, TextField } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { projects, teamMembers as seedMembers } from "../../data/mockData";
import type { MemberRole, MemberStatus, TeamMember } from "../../types";
import { initials } from "../../utils/format";

type MemberForm = Omit<TeamMember, "id" | "assignedProjects"> & { assignedProjects: string };

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(seedMembers);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<MemberForm>({
    defaultValues: {
      name: "",
      email: "",
      role: "Site Engineer",
      status: "Invited",
      assignedProjects: "",
      phone: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setMembers((current) => [
      {
        ...values,
        id: `m-${Date.now()}`,
        role: values.role as MemberRole,
        status: values.status as MemberStatus,
        assignedProjects: values.assignedProjects.split(",").map((item) => item.trim()).filter(Boolean),
      },
      ...current,
    ]);
    reset();
    setIsOpen(false);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Management"
        description="Invite members, manage roles, check status, and assign projects to field and office teams."
        actions={<Button icon={<UserPlus size={18} />} onClick={() => setIsOpen(true)}>Add Member</Button>}
      />

      <Card title="Members Table" description={`${members.length} team members`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs font-semibold uppercase tracking-normal text-ink-muted">
              <tr>
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Assigned Projects</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {members.map((member) => (
                <tr key={member.id} className="bg-white">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                        {initials(member.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{member.name}</p>
                        <p className="text-xs text-ink-muted">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{member.role}</td>
                  <td className="px-5 py-4 text-ink-muted">{member.assignedProjects.join(", ")}</td>
                  <td className="px-5 py-4 text-ink-muted">{member.phone}</td>
                  <td className="px-5 py-4"><MemberStatusBadge status={member.status} /></td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="ghost"
                      className="h-9 w-9 px-0 text-danger"
                      onClick={() => setMembers((current) => current.filter((item) => item.id !== member.id))}
                      aria-label={`Remove ${member.name}`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Assign Projects" description="Available projects for team allocation">
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="rounded-lg border border-line p-4">
              <p className="font-semibold text-ink">{project.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{project.manager}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-normal text-ink-muted">{project.team.length} assigned members</p>
            </article>
          ))}
        </div>
      </Card>

      <Modal title="Add Member" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <TextField label="Name" required {...register("name")} />
          <TextField label="Email" type="email" required {...register("email")} />
          <SelectField label="Role" {...register("role")}>
            <option>Owner</option>
            <option>Project Manager</option>
            <option>Site Engineer</option>
            <option>Contractor</option>
            <option>Viewer</option>
          </SelectField>
          <SelectField label="Status" {...register("status")}>
            <option>Active</option>
            <option>Invited</option>
            <option>Inactive</option>
          </SelectField>
          <TextField label="Phone" {...register("phone")} />
          <TextField label="Assign Projects" placeholder="Palm Heights, Civic School" {...register("assignedProjects")} />
          <div className="flex justify-end gap-2 md:col-span-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" icon={<Plus size={16} />}>Add Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
