export type ProjectStatus = "Planning" | "Active" | "Completed" | "Delayed" | "On Hold";
export type Priority = "Low" | "Medium" | "High";
export type MemberRole = "Owner" | "Project Manager" | "Site Engineer" | "Contractor" | "Viewer";
export type MemberStatus = "Active" | "Invited" | "Inactive";

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  manager: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  startDate: string;
  dueDate: string;
  budget: string;
  team: string[];
  description: string;
}

export interface DailyUpdate {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  progress: number;
  completedWork: string;
  issues: string;
  tomorrowPlan: string;
  author: string;
}

export interface SitePhoto {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  date: string;
  uploadedBy: string;
  category: "Foundation" | "Structure" | "Electrical" | "Plumbing" | "Finishing" | "Safety";
  imageUrl: string;
}

export interface Report {
  id: string;
  title: string;
  type: "Weekly" | "Monthly" | "Project";
  projectName: string;
  period: string;
  generatedAt: string;
  status: "Ready" | "Draft";
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  assignedProjects: string[];
  phone: string;
}

export interface Deadline {
  id: string;
  projectName: string;
  label: string;
  dueDate: string;
  status: "On Track" | "At Risk" | "Overdue";
}
