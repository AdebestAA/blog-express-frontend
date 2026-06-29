import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useLogout } from "../../hooks/useAuth";
import Button from "../ui/Button";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isAuthenticated = !!user;

  return (
    <nav className="sticky top-0 z-50 glass-card !rounded-none border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl neu-card-sm flex items-center justify-center !p-0 !bg-navy-800 !shadow-none">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-navy-800 tracking-tight">
              Persist
            </span>
          </Link>

          {!isAuthPage && (
            <div className="hidden sm:flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <Link
                    to="/blog"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-navy-600 hover:text-navy-800 hover:bg-white/50 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/blog/create"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-navy-600 hover:text-navy-800 hover:bg-white/50 transition-colors"
                  >
                    Write
                  </Link>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            {!isAuthPage && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-sm text-navy-400">
                      <span className="font-semibold text-navy-600">
                        {user?.email?.split("@")[0]}
                      </span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => logout.mutate()}
                      isLoading={logout.isPending}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/auth/login">
                      <Button variant="ghost" size="sm">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/auth/register">
                      <Button variant="primary" size="sm">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
