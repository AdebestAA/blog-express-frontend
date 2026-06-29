import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { commentService } from "../services/comment.service";
import { getErrorMessage } from "../lib/errors";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      comment,
      post_id,
    }: {
      comment: string;
      post_id: string;
    }) => commentService.create(comment, post_id),
    onSuccess: () => {
      toast.success("Comment added!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to add comment"));
    },
  });
}
