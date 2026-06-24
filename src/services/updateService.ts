import type { DailyUpdate } from "../types";
import { apiClient } from "./apiClient";

export const updateService = {
  list: () => apiClient.get<DailyUpdate[]>("/api/updates"),
  create: (payload: Omit<DailyUpdate, "id">) => apiClient.post<DailyUpdate>("/api/updates", payload),
  update: (id: string, payload: Partial<DailyUpdate>) => apiClient.patch<DailyUpdate>(`/api/updates/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/api/updates/${id}`),
};
