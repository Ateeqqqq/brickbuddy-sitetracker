import type { TeamMember } from "../types";
import { apiClient } from "./apiClient";

export const teamService = {
  list: () => apiClient.get<TeamMember[]>("/api/team"),
  create: (payload: Omit<TeamMember, "id">) => apiClient.post<TeamMember>("/api/team", payload),
  update: (id: string, payload: Partial<TeamMember>) => apiClient.patch<TeamMember>(`/api/team/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/api/team/${id}`),
};
