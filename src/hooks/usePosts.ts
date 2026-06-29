import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postService } from "../services/post.service";
import { getErrorMessage } from "../lib/errors";
import type { Post, GroupedPost } from "../types";

function groupPostsByPostId(posts: Post[]): GroupedPost[] {
  const map = new Map<string, GroupedPost>();

  for (const row of posts) {
    if (!map.has(row.post_id)) {
      map.set(row.post_id, {
        id: row.post_id,
        content: row.posts_contents,
        created_at: row.post_created_at,
        creator_id: row.post_creator_id,
        creator_email: row.post_creator,
        comments: [],
      });
    }

    if (row.comment_id) {
      map.get(row.post_id)!.comments.push({
        id: row.comment_id,
        comment: row.comment_content!,
        created_at: row.comment_created_at!,
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await postService.getAll();
      return groupPostsByPostId(posts);
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postService.create(content),
    onSuccess: () => {
      toast.success("Post published!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create post"));
    },
  });
}

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      postService.edit(id, content),
    onSuccess: () => {
      toast.success("Post updated!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update post"));
    },
  });
}
