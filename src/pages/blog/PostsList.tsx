import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import { useAuthStore } from "../../stores/authStore";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";

export default function PostsList() {
  const { data: posts, isLoading, isError } = usePosts();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="bg-[#f0ece9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/60 text-xs font-medium text-navy-600 mb-6 neu-card-sm">
            <span className="pulse-dot" />
            The Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Latest Posts
          </h1>
          <p className="text-lg text-navy-400 max-w-xl mx-auto">
            Thoughts, tutorials, and notes from the stack.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
              <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                <article className="neu-card card-lift p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center text-white text-xs font-bold">
                      {post.creator_email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-700">
                        {post.creator_email.split("@")[0]}
                      </p>
                      <p className="text-xs text-navy-400">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>

                  <p className="text-navy-600 leading-relaxed flex-1 line-clamp-4 mb-4 text-sm">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-navy-100/50">
                    <div className="flex items-center gap-1.5 text-sm text-navy-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                      </svg>
                      <span>
                        {post.comments.length}{" "}
                        {post.comments.length === 1 ? "reply" : "replies"}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-navy-600 group-hover:text-navy-800 transition-colors flex items-center gap-1">
                      Read
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
