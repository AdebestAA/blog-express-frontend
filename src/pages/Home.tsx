import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Button from "../components/ui/Button";

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-[#f0ece9]">
      {/* Hero */}

      <section className="relative overflow-hidden px-4 pt-28 pb-36">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/60 text-xs font-medium text-navy-600 mb-8 neu-card-sm">
            <span className="pulse-dot" />
            PostgreSQL &middot; Express &middot; Redis
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-navy-900 tracking-tight mb-6 leading-[1.08]">
            Blogging, <span className="text-navy-600">stack-first.</span>
          </h1>

          <p className="text-xl text-navy-400 max-w-xl mx-auto mb-10 leading-relaxed">
            A full-stack journal built to master PostgreSQL, Express, and Redis
            — one post at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link to="/blog">
                <Button variant="primary" size="lg">
                  Read the Blog
                  <svg
                    className="w-5 h-5"
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
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/register">
                  <Button variant="primary" size="lg">
                    Start Writing
                    <svg
                      className="w-5 h-5"
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
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stack Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "PostgreSQL",
              desc: "Relational data with joins, constraints, and row-level security. Users, posts, comments — all normalized.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                />
              ),
            },
            {
              label: "Express.js",
              desc: "RESTful API with middleware pipelines, route modularization, Zod validation, and global error handling.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                />
              ),
            },
            {
              label: "Redis",
              desc: "Session caching and refresh token blacklisting. JWT access tokens paired with Redis-backed refresh tokens.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ),
            },
          ].map((item, i) => (
            <div key={i} className="neu-card card-lift p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-navy-800 flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">
                {item.label}
              </h3>
              <p className="text-navy-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 relative overflow-hidden py-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-navy-700/30 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-navy-700/30 blur-[100px]" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built to learn. Open to read.
          </h2>
          <p className="text-lg text-navy-200 mb-8">
            Every route, every query, every cache key — documented by doing.
          </p>
          {!user && (
            <Link to="/auth/register">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
