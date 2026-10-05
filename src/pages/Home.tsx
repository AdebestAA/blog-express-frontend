import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Button from "../components/ui/Button";

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}

      <section className="px-4 pt-24 pb-24 border-b border-navy-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-xs font-semibold text-navy-500 mb-8">
            <span className="pulse-dot" />
            PostgreSQL &middot; Express &middot; Redis
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-navy-900 tracking-tight mb-6 leading-[1.05]">
            Blogging, <span className="text-brand-500">stack-first.</span>
          </h1>

          <p className="text-lg text-navy-500 max-w-xl mx-auto mb-10 leading-relaxed">
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
            <div key={i} className="neu-card p-7">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-brand-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                {item.label}
              </h3>
              <p className="text-navy-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy-100 py-24">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">
            Built to learn. Open to read.
          </h2>
          <p className="text-lg text-navy-500 mb-8">
            Every route, every query, every cache key — documented by doing.
          </p>
          {!user && (
            <Link to="/auth/register">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
