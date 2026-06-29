import api from "../lib/api";
import type { Post } from "../types";

export const postService = {
  async getAll() {
    const { data } = await api.get<{ success: boolean; data: Post[] }>(
      "/posts",
    );
    if (!data.success) throw new Error("Failed to fetch posts");
    return data.data;
  },

  async create(content: string) {
    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/posts",
      { content },
    );
    if (!data.success) throw new Error(data.message || "Failed to create post");
    return data;
  },

  async edit(id: string, content: string) {
    const { data } = await api.patch<{ success: boolean; message?: string }>(
      `/posts/${id}`,
      { content },
    );
    if (!data.success) throw new Error(data.message || "Failed to edit post");
    return data;
  },
};
