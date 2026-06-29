import api from "../lib/api";
import type { AuthData } from "../types";

export const authService = {
  async signIn(email: string, password: string) {
    const { data } = await api.post<{
      success: boolean;
      message?: string;
      data?: AuthData;
    }>("/auth/signin", { email, password });

    if (!data.success || !data.data) {
      throw new Error(data.message || "Login failed");
    }
    return data.data;
  },

  async register(nickname: string, email: string, password: string) {
    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/auth/register",
      { nickname, email, password },
    );

    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  },

  async verifyEmail(email: string, otp: string) {
    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/auth/email-verify",
      { email, otp },
    );

    if (!data.success) {
      throw new Error(data.message || "Verification failed");
    }
    return data;
  },

  async refreshToken() {
    const { data } = await api.post<{
      success: boolean;
      data?: AuthData;
    }>("/auth/refresh", {});

    if (!data.success || !data.data) {
      throw new Error("Session expired");
    }
    return data.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },
};
