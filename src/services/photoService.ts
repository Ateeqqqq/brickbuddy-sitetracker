import type { SitePhoto } from "../types";
import { apiClient } from "./apiClient";

export interface PhotoUploadPayload {
  projectId: string;
  projectName?: string;
  title: string;
  date: string;
  uploadedBy: string;
  category: SitePhoto["category"];
  imageUrl?: string;
  file?: File | null;
}

export const photoService = {
  list: () => apiClient.get<SitePhoto[]>("/api/photos"),
  upload: (payload: PhotoUploadPayload) => {
    const formData = new FormData();
    formData.append("projectId", payload.projectId);
    if (payload.projectName) formData.append("projectName", payload.projectName);
    formData.append("title", payload.title);
    formData.append("date", payload.date);
    formData.append("uploadedBy", payload.uploadedBy);
    formData.append("category", payload.category);
    if (payload.imageUrl) formData.append("imageUrl", payload.imageUrl);
    if (payload.file) formData.append("photoFile", payload.file);

    return apiClient.post<SitePhoto>("/api/photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id: string) => apiClient.delete(`/api/photos/${id}`),
};
