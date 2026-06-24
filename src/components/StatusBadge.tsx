import type { MemberStatus, ProjectStatus } from "../types";
import { Badge } from "./ui/Badge";

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const tone = status === "Completed" ? "green" : status === "Delayed" ? "red" : status === "Planning" ? "blue" : "slate";
  return <Badge tone={tone}>{status}</Badge>;
}

export function MemberStatusBadge({ status }: { status: MemberStatus }) {
  const tone = status === "Active" ? "green" : status === "Invited" ? "amber" : "slate";
  return <Badge tone={tone}>{status}</Badge>;
}
