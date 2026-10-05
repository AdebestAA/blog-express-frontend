import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useLogout } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useAccount";
import Button from "../ui/Button";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isAuthenticated = !!user;
  const { data: profile } = useProfile(isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 glass-card !rounded-none border-b border-navy-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center">
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
            <span className="text-xl font-bold text-navy-900 tracking-tight">
              Persist
            </span>
          </Link>

          {!isAuthPage && (
            <div className="hidden sm:flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <Link
                    to="/blog"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/blog/create"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
                  >
                    Write
                  </Link>
                  <Link
                    to="/account"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-navy-100 transition-colors"
                  >
                    Profile
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
                    <Link
                      to="/account"
                      className="flex items-center gap-2 group"
                      title="Your profile"
                    >
                      {profile?.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="Your avatar"
                          className="w-8 h-8 rounded-full object-cover border border-navy-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                          {user?.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="hidden sm:block text-sm font-semibold text-navy-700 group-hover:text-navy-900 transition-colors">
                        {profile?.nickname || user?.email?.split("@")[0]}
                      </span>
                    </Link>
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
