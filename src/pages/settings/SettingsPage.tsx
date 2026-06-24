import { useForm } from "react-hook-form";
import { Bell, Building2, Lock, Save, User } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField, TextField } from "../../components/ui/Input";
import { PageHeader } from "../../components/ui/PageHeader";

export function SettingsPage() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Ateeq Malik",
      email: "admin@brickbuddy.com",
      company: "BrickBuddy Construction",
      phone: "(555) 555-0124",
      timezone: "Asia/Calcutta",
      currentPassword: "",
      newPassword: "",
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage profile details, company information, notifications, and password settings." />

      <form className="grid gap-6 xl:grid-cols-2" onSubmit={handleSubmit(() => undefined)}>
        <Card title="Profile" description="Personal account information" action={<User size={20} className="text-primary" />}>
          <div className="grid gap-4 p-5">
            <TextField label="Full name" {...register("name")} />
            <TextField label="Email" type="email" {...register("email")} />
            <TextField label="Phone" {...register("phone")} />
            <SelectField label="Timezone" {...register("timezone")}>
              <option>Asia/Calcutta</option>
              <option>America/New_York</option>
              <option>America/Chicago</option>
              <option>Europe/London</option>
            </SelectField>
          </div>
        </Card>

        <Card title="Company Information" description="Workspace identity and organization details" action={<Building2 size={20} className="text-primary" />}>
          <div className="grid gap-4 p-5">
            <TextField label="Company name" {...register("company")} />
            <TextField label="Industry" defaultValue="Construction" />
            <TextField label="Primary region" defaultValue="United States" />
            <TextField label="Company size" defaultValue="51-200 employees" />
          </div>
        </Card>

        <Card title="Notification Settings" description="Control updates from projects and reports" action={<Bell size={20} className="text-primary" />}>
          <div className="space-y-4 p-5">
            {["Daily update reminders", "Delayed project alerts", "Weekly report summaries", "Photo upload notifications"].map((label) => (
              <label key={label} className="flex items-center justify-between gap-4 rounded-md border border-line px-4 py-3">
                <span className="font-medium text-ink">{label}</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-line text-primary" />
              </label>
            ))}
          </div>
        </Card>

        <Card title="Password Management" description="Update account access credentials" action={<Lock size={20} className="text-primary" />}>
          <div className="grid gap-4 p-5">
            <TextField label="Current password" type="password" {...register("currentPassword")} />
            <TextField label="New password" type="password" {...register("newPassword")} />
            <TextField label="Confirm password" type="password" />
          </div>
        </Card>

        <div className="xl:col-span-2">
          <Button type="submit" icon={<Save size={18} />}>Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
