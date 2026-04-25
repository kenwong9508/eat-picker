// src/layout/MainLayout.tsx
import { useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../routes/config";
import {
  EatPickerLogo,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
  SparkIcon,
} from "../components/icons";
import { cn } from "../utils";
import { ThemeMode, useTheme } from "../hooks/useTheme";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useCloseOnDesktop } from "../hooks/useCloseOnDesktop";
import { Suspense } from "react";
import { PageFallback } from "../components/PageFallback";

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

type DesktopNavProps = {
  menuRoutes: typeof routes;
};

function DesktopNav({ menuRoutes }: DesktopNavProps) {
  return (
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
            cn(desktopNavBase, isActive ? desktopNavActive : desktopNavIdle)
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
  );
}

type MobileDrawerProps = {
  menuRoutes: typeof routes;
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
};

function MobileDrawer({
  menuRoutes,
  isOpen,
  onClose,
  theme,
  onToggleTheme,
}: MobileDrawerProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={cn(
          "absolute right-3 top-3 bottom-3 flex w-[calc(100vw-24px)] max-w-[340px] flex-col gap-4 rounded-[26px] border border-stone-900/10 bg-[#fffdfa] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.22)] transition-transform duration-200 dark:border-white/10 dark:bg-stone-900",
          isOpen ? "translate-x-0" : "translate-x-[110%]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <EatPickerLogo />
            <div>
              <p className="mb-0.5 text-[11px] uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                Navigation
              </p>
              <h2 className="text-lg font-bold leading-tight">Eat Picker</h2>
            </div>
          </div>

          <button
            type="button"
            className="inline-grid h-11 w-11 place-items-center rounded-xl border border-stone-900/10 bg-white text-stone-900 dark:border-white/10 dark:bg-stone-800 dark:text-stone-100"
            aria-label="Close navigation menu"
            onClick={onClose}
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
              onClick={onClose}
              className={({ isActive }) =>
                cn(mobileNavBase, isActive ? mobileNavActive : mobileNavIdle)
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
            onClick={onToggleTheme}
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
  );
}

export function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const menuRoutes = useMemo(
    () => routes.filter((route) => route.showInMenu),
    [],
  );

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  useLockBodyScroll(isMobileDrawerOpen);
  useCloseOnDesktop(() => setIsMobileDrawerOpen(false));

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
                  Eat Picker
                </span>
              </div>
            </NavLink>
          </div>
          <DesktopNav menuRoutes={menuRoutes} />
          <div className="flex items-center gap-2">
            {/* Desktop theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden items-center gap-2 rounded-xl border border-stone-900/10 bg-white px-3 py-1.5 text-sm font-medium text-stone-900 shadow-sm hover:bg-stone-50 md:inline-flex dark:border-white/10 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              aria-label="Toggle theme"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 text-teal-700 dark:bg-stone-800 dark:text-teal-300">
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </span>
                <span className="hidden text-xs font-semibold sm:inline">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </span>
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-grid h-11 w-11 place-items-center rounded-xl border border-stone-900/10 bg-white text-stone-900 md:hidden dark:border-white/10 dark:bg-stone-900 dark:text-stone-100"
              aria-label="Open navigation menu"
              onClick={() => setIsMobileDrawerOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </header>
        <MobileDrawer
          menuRoutes={menuRoutes}
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content" className="pt-4 sm:pt-5">
          <div className="mx-auto w-full max-w-6xl">
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
