import type { Project } from "../types";
import { apiClient } from "./apiClient";

export const projectService = {
  list: () => apiClient.get<Project[]>("/api/projects"),
  getById: (id: string) => apiClient.get<Project>(`/api/projects/${id}`),
  create: (payload: Omit<Project, "id">) => apiClient.post<Project>("/api/projects", payload),
  update: (id: string, payload: Partial<Project>) => apiClient.patch<Project>(`/api/projects/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/api/projects/${id}`),
};
