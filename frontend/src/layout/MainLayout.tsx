// src/layout/MainLayout.tsx
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../routes/config";

type ThemeMode = "light" | "dark";

function EatPickerLogo() {
  return (
    <svg
      className="h-11 w-11 shrink-0 text-teal-700 dark:text-teal-300"
      viewBox="0 0 40 40"
      aria-label="eat-picker"
      fill="none"
      role="img"
    >
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="12"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M14 13.5C14 11.567 15.567 10 17.5 10H22.5C24.433 10 26 11.567 26 13.5C26 15.433 24.433 17 22.5 17H14V13.5Z"
        fill="currentColor"
      />
      <path
        d="M14 20H22.5C24.433 20 26 21.567 26 23.5C26 25.433 24.433 27 22.5 27H17.5C15.567 27 14 25.433 14 23.5V20Z"
        fill="currentColor"
        opacity="0.58"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5V5.5M12 18.5V21.5M21.5 12H18.5M5.5 12H2.5M18.72 5.28L16.6 7.4M7.4 16.6L5.28 18.72M18.72 18.72L16.6 16.6M7.4 7.4L5.28 5.28" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.2A7.9 7.9 0 0 1 9.8 4 9 9 0 1 0 20 14.2Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7H20M4 12H20M4 17H20" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6L18 18M18 6L6 18" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" />
    </svg>
  );
}

const desktopNavBase =
  "min-w-[176px] rounded-2xl border px-3.5 py-3 transition duration-200";
const desktopNavIdle =
  "border-transparent text-stone-500 hover:-translate-y-0.5 hover:border-stone-300/70 hover:bg-white/40 dark:text-stone-400 dark:hover:border-white/10 dark:hover:bg-white/[0.04]";
const desktopNavActive =
  "border-teal-700/15 bg-white text-stone-900 shadow-[inset_0_0_0_1px_rgba(15,118,110,0.06)] dark:border-teal-300/20 dark:bg-stone-900 dark:text-stone-50";

const mobileNavBase =
  "grid grid-cols-[44px_1fr] items-center gap-3 rounded-2xl border px-3 py-3 transition duration-200";
const mobileNavIdle =
  "border-transparent bg-stone-100 text-stone-900 hover:translate-x-0.5 dark:bg-stone-800 dark:text-stone-100";
const mobileNavActive =
  "border-teal-700/15 bg-teal-700/10 text-stone-950 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-stone-50";

export function MainLayout() {
  const menuRoutes = useMemo(
    () => routes.filter((route) => route.showInMenu),
    [],
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    media.addEventListener("change", handleDesktop);
    return () => media.removeEventListener("change", handleDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-stone-900 transition-colors dark:bg-[#12110f] dark:text-stone-100">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.04),transparent_24%)] px-3 py-3 sm:px-5 sm:py-5">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <header className="sticky top-3 z-40 grid grid-cols-[1fr_auto] items-center gap-3 rounded-[24px] border border-stone-900/10 bg-[rgba(255,253,250,0.78)] px-3 py-3 shadow-[0_8px_24px_rgba(35,29,24,0.06)] backdrop-blur md:grid-cols-[auto_1fr_auto] md:gap-4 md:px-4 dark:border-white/10 dark:bg-[rgba(28,26,23,0.8)] dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              end
              className="inline-flex min-w-0 items-center gap-3"
            >
              <EatPickerLogo />
              <div className="min-w-0">
                <span className="hidden text-[11px] uppercase tracking-[0.08em] text-stone-500 md:block dark:text-stone-400">
                  Hong Kong food helper
                </span>
                <span className="block text-base font-bold leading-tight sm:text-lg">
                  eat picker
                </span>
              </div>
            </NavLink>
          </div>

          <nav
            className="hidden items-center justify-center gap-2 md:flex"
            aria-label="Primary navigation"
          >
            {menuRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.path === "/"}
                className={({ isActive }) =>
                  [
                    desktopNavBase,
                    isActive ? desktopNavActive : desktopNavIdle,
                  ].join(" ")
                }
              >
                <span className="block text-sm font-bold leading-tight">
                  {route.name}
                </span>
                <span className="mt-1 block text-xs leading-tight text-stone-500 dark:text-stone-400">
                  {route.hint ?? "Open page"}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-grid h-11 w-11 place-items-center rounded-xl border border-stone-900/10 bg-white text-stone-900 md:hidden dark:border-white/10 dark:bg-stone-900 dark:text-stone-100"
              aria-label="Open navigation menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </header>
        <div
          className={[
            "fixed inset-0 z-50 md:hidden",
            isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!isMobileMenuOpen}
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className={[
              "absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200",
              isMobileMenuOpen ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          <aside
            className={[
              "absolute right-3 top-3 bottom-3 flex w-[calc(100vw-24px)] max-w-[340px] flex-col gap-4 rounded-[26px] border border-stone-900/10 bg-[#fffdfa] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.22)] transition-transform duration-200 dark:border-white/10 dark:bg-stone-900",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-[110%]",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <EatPickerLogo />
                <div>
                  <p className="mb-0.5 text-[11px] uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                    Navigation
                  </p>
                  <h2 className="text-lg font-bold leading-tight">
                    eat picker
                  </h2>
                </div>
              </div>

              <button
                type="button"
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-stone-900/10 bg-white text-stone-900 dark:border-white/10 dark:bg-stone-800 dark:text-stone-100"
                aria-label="Close navigation menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {menuRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      mobileNavBase,
                      isActive ? mobileNavActive : mobileNavIdle,
                    ].join(" ")
                  }
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-teal-700 dark:bg-stone-800 dark:text-teal-300">
                    <SparkIcon />
                  </div>

                  <div className="min-w-0">
                    <span className="block text-sm font-bold leading-tight">
                      {route.name}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-stone-500 dark:text-stone-400">
                      {route.hint ?? "Open page"}
                    </span>
                  </div>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center justify-between gap-3 rounded-[20px] border border-stone-900/10 bg-stone-100 px-4 py-3 text-left dark:border-white/10 dark:bg-stone-800"
              >
                <span className="flex flex-col gap-1">
                  <strong className="text-sm">Theme</strong>
                  <small className="text-xs text-stone-500 dark:text-stone-400">
                    Switch to {theme === "dark" ? "light" : "dark"} mode
                  </small>
                </span>

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-teal-700 dark:bg-stone-900 dark:text-teal-300">
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </span>
              </button>
            </div>
          </aside>
        </div>

        <main id="main-content" className="pt-4 sm:pt-5">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
