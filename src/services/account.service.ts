import api from "../lib/api";
import type { UpdateProfilePayload, UserProfile } from "../types";

export const accountService = {
  // GET /api/accounts — current user's profile
  async getProfile() {
    const { data } = await api.get<{ success: boolean; data: UserProfile }>(
      "/accounts",
    );
    if (!data.success) {
      throw new Error("Failed to load profile");
    }
    return data.data;
  },

  // PATCH /api/accounts — updates any subset of { nickname, first_name, last_name }
  async updateProfile(payload: UpdateProfilePayload) {
    const { data } = await api.patch<{ success: boolean; message?: string }>(
      "/accounts",
      payload,
    );
    if (!data.success) {
      throw new Error(data.message || "Failed to update profile");
    }
    return data;
  },

  // POST /api/accounts/profile-pic — multipart, field name "image"
  async updateProfilePic(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/accounts/profile-pic",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    if (!data.success) {
      throw new Error(data.message || "Failed to upload image");
    }
    return data;
  },
};
