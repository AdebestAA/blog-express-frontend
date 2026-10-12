import { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

function TabIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="w-[22px] h-[22px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.9}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function MobileTabBar() {
  const { pathname } = useLocation();

  const tabs = [
    {
      to: "/blog",
      label: "Feeds",
      active:
        pathname.startsWith("/blog") && !pathname.startsWith("/blog/create"),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955a1.5 1.5 0 012.12 0L22.28 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
        />
      ),
    },
    {
      to: "/blog/create",
      label: "Create",
      active: pathname.startsWith("/blog/create"),
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
        </>
      ),
    },
    {
      to: "/account",
      label: "Profile",
      active: pathname.startsWith("/account"),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75h-15v-.75z"
        />
      ),
    },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="sm:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-navy-200 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-3">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={tab.active ? "page" : undefined}
            className={`relative flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
              tab.active ? "text-navy-900" : "text-navy-400"
            }`}
          >
            {tab.active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-brand-500" />
            )}
            <TabIcon>{tab.icon}</TabIcon>
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
