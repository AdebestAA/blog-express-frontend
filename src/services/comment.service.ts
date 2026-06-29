import api from "../lib/api";

export const commentService = {
  async create(comment: string, post_id: string) {
    const { data } = await api.post<{ success: boolean; message?: string }>(
      "/comments",
      { comment, post_id },
    );
    if (!data.success)
      throw new Error(data.message || "Failed to add comment");
    return data;
  },
};
