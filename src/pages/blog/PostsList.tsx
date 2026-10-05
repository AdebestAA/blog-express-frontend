import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useAuthStore } from "../../stores/authStore";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import { MessageSquare, Heart } from "lucide-react";

export default function PostsList() {
  const { data: posts, isLoading, isError } = usePosts();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-xs font-semibold text-navy-500 mb-6">
            <span className="pulse-dot" />
            The Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Latest Posts
          </h1>
          <p className="text-lg text-navy-500 max-w-xl mx-auto">
            Thoughts, tutorials, and notes from the stack.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">
              Failed to load posts
            </h3>
            <p className="text-navy-400 mb-6">Something went wrong.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !isError && posts?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 neu-card flex items-center justify-center">
              <svg
                className="w-10 h-10 text-navy-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-navy-800 mb-2">
              No posts yet
            </h3>
            <p className="text-navy-400 mb-6">
              Be the first to share something.
            </p>
            {user && (
              <Button onClick={() => navigate("/blog/create")}>
                Write Your First Post
              </Button>
            )}
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group block"
              >
                <article className="neu-card card-lift p-5 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                      {(post.nickname?.trim()?.charAt(0) || "?").toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-800">
                        {post.nickname?.trim() || "Anonymous"}
                      </p>
                      <p className="text-xs text-navy-400">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>

                  <p className="text-navy-600 leading-relaxed flex-1 line-clamp-4 mb-4 text-sm">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-navy-100">
                    <span className="flex items-center gap-x-2 text-sm text-navy-500">
                      <Heart size={15} /> {post.likes_count}
                    </span>
                    <span className="flex items-center gap-x-2 text-sm text-navy-500">
                      <MessageSquare size={15} /> {post.comments_count}
                    </span>
                    <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors flex items-center gap-1 ml-auto">
                      Read
                      <svg
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
