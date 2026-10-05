import { Link } from "react-router-dom";
import { type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
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
    <div className="min-h-screen flex bg-white">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-brand-500">
        <div className="relative flex flex-col justify-center px-14 w-full">
          <Link to="/" className="flex items-center gap-2.5 mb-12 group">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
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

          <h2 className="text-4xl font-bold text-white leading-tight mb-4 tracking-tight">
            Write it down.
            <br />
            Make it persist.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            A full-stack journal built to master
            <br />
            the modern backend stack.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
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
            <span className="text-lg font-bold text-navy-900">Persist</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-900 mb-2 tracking-tight">
              {title}
            </h1>
            {subtitle && <p className="text-navy-400">{subtitle}</p>}
          </div>

          {children}

          {footerLink && (
            <p className="mt-8 text-center text-sm text-navy-400">
              {footerText}{" "}
              <Link
                to={footerLink}
                className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                {footerLinkText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
