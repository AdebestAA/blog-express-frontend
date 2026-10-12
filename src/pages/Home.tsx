import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

function MockFeedCard() {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-navy-900" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-24 rounded-full bg-navy-200" />
          <div className="h-2 w-16 rounded-full bg-navy-100" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2.5 w-full rounded-full bg-navy-100" />
        <div className="h-2.5 w-4/5 rounded-full bg-navy-100" />
      </div>
      <div className="mt-4 h-36 rounded-xl bg-gradient-to-br from-navy-100 to-navy-200" />
      <div className="mt-4 flex items-center gap-4 border-t border-navy-100 pt-3">
        <div className="h-2.5 w-10 rounded-full bg-navy-100" />
        <div className="h-2.5 w-14 rounded-full bg-navy-100" />
      </div>
    </div>
  );
}

export default function Home() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-13rem] h-[34rem] w-[54rem] max-w-[120vw] -translate-x-1/2"
        >
          <div className="h-full w-full rounded-full bg-white/10 blur-[130px] animate-glow" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[6%] top-[38%] h-72 w-72 rounded-full bg-white/[0.07] blur-[110px] animate-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] bottom-[8%] h-64 w-64 rounded-full bg-navy-400/20 blur-[100px] animate-float"
          style={{ animationDelay: "-3.5s" }}
        />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-5xl flex-col items-center justify-center px-4 py-28 text-center">
          <h1 className="animate-fade-up flex items-baseline justify-center gap-x-[0.1em] text-[clamp(3.5rem,15vw,9.5rem)] font-black leading-[0.9] tracking-tighter">
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Yarn
            </span>
            <span className="bg-gradient-to-b from-white/90 to-white/30 bg-clip-text font-serif font-normal italic">
              Ham.
            </span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.6em] w-[4px] translate-y-[0.04em] rounded-full bg-white animate-blink"
            />
          </h1>

          <div
            className="animate-fade-up mt-14 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "0.15s" }}
          >
            {user ? (
              <Link
                to="/blog"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-navy-950 transition-all hover:bg-navy-100 active:scale-[0.98] sm:w-auto"
              >
                Read the Blog
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/register"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-navy-950 transition-all hover:bg-navy-100 active:scale-[0.98] sm:w-auto"
                >
                  Start Writing
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-2">
            <span className="h-2 w-1 rounded-full bg-white/70 animate-cue" />
          </div>
        </div>
      </section>

      {/* ── Decorative product preview ── */}
      <section
        aria-hidden="true"
        className="relative overflow-hidden px-4 pb-28 pt-6"
      >
        <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-white/[0.06] blur-[90px]" />
        <div className="relative mx-auto w-full max-w-[22rem]">
          <div className="absolute inset-0 rotate-3 rounded-2xl bg-white/[0.06] ring-1 ring-white/10" />
          <div className="relative -rotate-1">
            <MockFeedCard />
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-t border-white/10 py-6">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex shrink-0 items-center gap-10 pr-10 text-3xl font-black uppercase tracking-tight text-white/80 sm:text-4xl"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 whitespace-nowrap"
                >
                  YarnHam
                  <span className="text-white/25">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
