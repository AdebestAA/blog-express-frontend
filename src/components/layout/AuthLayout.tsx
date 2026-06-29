import { Link } from "react-router-dom";
import { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[#f0ece9]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-navy-900">
        {/* Soft gradient orbs behind glass */}
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-navy-700/40 blur-[80px]" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-navy-600/25 blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-navy-500/10 blur-[80px]" />

        <div className="relative flex flex-col justify-center px-14 w-full">
          <Link to="/" className="flex items-center gap-2.5 mb-12 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/10">
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
            <span className="text-2xl font-bold text-white tracking-tight">
              Persist
            </span>
          </Link>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            PostgreSQL.
            <br />
            Express. Redis.
          </h2>
          <p className="text-lg text-navy-200 leading-relaxed">
            A full-stack blog built to master
            <br />
            the modern backend stack.
          </p>

          <div className="mt-auto pt-16 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/60" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            <span className="text-lg font-bold text-navy-800">Persist</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-800 mb-2">{title}</h1>
            {subtitle && (
              <p className="text-navy-400">{subtitle}</p>
            )}
          </div>

          {children}

          <p className="mt-8 text-center text-sm text-navy-400">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="font-semibold text-navy-700 hover:text-navy-900 transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
