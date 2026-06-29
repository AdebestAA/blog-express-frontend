import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts, useEditPost } from "../../hooks/usePosts";
import { useCreateComment } from "../../hooks/useComments";
import { useAuthStore } from "../../stores/authStore";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: posts, isLoading } = usePosts();
  const user = useAuthStore((s) => s.user);
  const createComment = useCreateComment();
  const editPost = useEditPost();

  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const post = posts?.find((p) => p.id === id);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const isOwner = user?.email && post?.creator_email === user.email;

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    createComment.mutate({ comment: comment.trim(), post_id: id! });
    setComment("");
  };

  const handleEditSubmit = () => {
    if (!editContent.trim()) return;
    editPost.mutate(
      { id: id!, content: editContent.trim() },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 bg-[#f0ece9]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#f0ece9] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-navy-800 mb-2">Post not found</h2>
          <p className="text-navy-400 mb-6">This post doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0ece9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm text-navy-400 hover:text-navy-600 mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all posts
        </button>

        {/* Post Card */}
        <article className="neu-card p-8 sm:p-10 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-navy-800 flex items-center justify-center text-white font-bold text-lg">
              {post.creator_email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-navy-800">
                {post.creator_email.split("@")[0]}
              </p>
              <p className="text-sm text-navy-400">{formatDate(post.created_at)}</p>
            </div>
            {isOwner && (
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditContent(post.content);
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={5}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEditSubmit} isLoading={editPost.isPending}>
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-navy-700 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </p>
            </div>
          )}
        </article>

        {/* Comments */}
        <div className="neu-card p-8 sm:p-10">
          <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            Discussion
            <span className="text-sm font-normal text-navy-400">({post.comments.length})</span>
          </h3>

          <div className="space-y-4 mb-8">
            {post.comments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-navy-400">No comments yet. Start the conversation!</p>
              </div>
            ) : (
              post.comments.map((c) => (
                <div key={c.id} className="neu-inset p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-navy-200 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <span className="text-xs text-navy-400">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-navy-600 text-sm leading-relaxed">{c.comment}</p>
                </div>
              ))
            )}
          </div>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="flex gap-3 items-start">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="flex-1"
              />
              <Button type="submit" size="md" isLoading={createComment.isPending}>
                Post
              </Button>
            </form>
          ) : (
            <div className="neu-inset p-6 text-center">
              <p className="text-navy-400 text-sm">
                <a href="/auth/login" className="text-navy-700 font-semibold hover:text-navy-900">
                  Sign in
                </a>{" "}
                to join the discussion.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
