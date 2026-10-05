import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts, useEditPost } from "../../hooks/usePosts";
import { useCommentsByPost, useCreateComment } from "../../hooks/useComments";
import { useProfile } from "../../hooks/useAccount";
import { useAuthStore } from "../../stores/authStore";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { Heart, MessageSquare } from "lucide-react";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: comments, isLoading: commentsLoading } = useCommentsByPost(id);
  const { data: profile } = useProfile();
  const user = useAuthStore((s) => s.user);
  const createComment = useCreateComment();
  const editPost = useEditPost();

  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const post = posts?.find((p) => p.id === id);

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const isOwner =
    !!profile?.nickname &&
    !!post?.nickname &&
    post.nickname === profile.nickname;

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

  if (postsLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Post not found</h2>
          <p className="text-navy-500 mb-6">This post doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm text-navy-500 hover:text-brand-600 mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to all posts
        </button>

        {/* Post */}
        <article className="neu-card p-8 sm:p-10 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
              {(post.nickname?.trim()?.charAt(0) || "?").toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-navy-900">
                {post.nickname?.trim() || "Anonymous"}
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
            <>
              <p className="text-navy-700 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </p>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-navy-100">
                <span className="flex items-center gap-x-2 text-sm text-navy-500">
                  <Heart size={16} /> {post.likes_count}
                  <span className="text-navy-400">likes</span>
                </span>
                <span className="flex items-center gap-x-2 text-sm text-navy-500">
                  <MessageSquare size={16} /> {post.comments_count}
                  <span className="text-navy-400">comments</span>
                </span>
              </div>
            </>
          )}
        </article>

        {/* Comments */}
        <div className="neu-card p-8 sm:p-10">
          <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
            Discussion
            {comments && (
              <span className="text-sm font-normal text-navy-400">({comments.length})</span>
            )}
          </h3>

          <div className="space-y-4 mb-8">
            {commentsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="sm" />
              </div>
            ) : comments && comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="neu-inset p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-[10px] font-bold">
                      {c.user_email.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-navy-700">
                      {c.user_email.split("@")[0]}
                    </span>
                    <span className="text-xs text-navy-400">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-navy-600 text-sm leading-relaxed">{c.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-navy-400">No comments yet. Start the conversation!</p>
              </div>
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
              <p className="text-navy-500 text-sm">
                <a href="/auth/login" className="text-brand-600 font-semibold hover:text-brand-700">
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
