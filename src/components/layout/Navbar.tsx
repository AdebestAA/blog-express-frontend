import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useLogout } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useAccount";
import { getInitial, getUsernameFromEmail } from "../../helpers";
import Button from "../ui/Button";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isAuthenticated = !!user;
  const { data: profile } = useProfile(isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 glass-card !rounded-none border-b border-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
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
            <span className="hidden min-[460px]:block text-xl font-bold text-navy-900 tracking-tight">
              Black Book
            </span>
          </Link>

          {!isAuthPage && (
            <div className="hidden sm:flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <Link
                    to="/blog"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-white/80 hover:shadow-sm transition-all"
                  >
                    Feeds
                  </Link>
                  <Link
                    to="/blog/create"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-white/80 hover:shadow-sm transition-all"
                  >
                    Post
                  </Link>
                  <Link
                    to="/account"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-navy-700 hover:bg-white/80 hover:shadow-sm transition-all"
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
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-md"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-bold shadow-md shadow-brand-500/30">
                          {getInitial(user?.email)}
                        </div>
                      )}
                      <span className="hidden sm:block text-sm font-semibold text-navy-700 group-hover:text-navy-900 transition-colors">
                        {profile?.nickname || getUsernameFromEmail(user?.email)}
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
