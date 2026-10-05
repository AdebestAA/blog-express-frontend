import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/usePosts";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";

export default function CreatePost() {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createPost.mutate(content.trim(), {
      onSuccess: () => navigate("/blog"),
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-sm text-navy-500 hover:text-brand-600 mb-8 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Cancel
        </button>

        <div className="neu-card p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-900 mb-2 tracking-tight">
              Create a new post
            </h1>
            <p className="text-navy-500">
              Share your thoughts, ideas, or what you learned today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              label="What's on your mind?"
              placeholder="Start writing something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />

            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-navy-400">
                {content.length} characters
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  isLoading={createPost.isPending}
                  disabled={!content.trim()}
                >
                  Publish Post
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
