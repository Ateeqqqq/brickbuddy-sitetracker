import { apiClient } from "./apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  company: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: "bearer";
}

export const authService = {
  login: (payload: LoginPayload) => apiClient.post<AuthTokenResponse>("/api/auth/login", payload),
  register: (payload: RegisterPayload) => apiClient.post<AuthTokenResponse>("/api/auth/register", payload),
  forgotPassword: (email: string) => apiClient.post("/api/auth/forgot-password", { email }),
  logout: () => apiClient.post("/api/auth/logout"),
};
