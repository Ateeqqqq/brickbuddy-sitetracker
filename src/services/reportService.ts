import type { Report } from "../types";
import { apiClient } from "./apiClient";

export const reportService = {
  list: () => apiClient.get<Report[]>("/api/reports"),
  generate: (payload: { projectId?: string; type: Report["type"]; period: string }) =>
    apiClient.post<Report>("/api/reports", payload),
  downloadPdf: (id: string) => apiClient.get(`/api/reports/${id}/pdf`, { responseType: "blob" }),
};
