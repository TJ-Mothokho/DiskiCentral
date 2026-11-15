"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/themes/ThemeContext";

const NavBar = () => {
  const { darkMode, toggleDarkMode, isDarkModeToggleDisabled } = useTheme();
  const ThemeIcon = darkMode ? Sun : Moon;

  return (
    <header className="border-b px-4 py-3">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-x-4 gap-y-3 md:grid-cols-[auto_minmax(6rem,1fr)_minmax(12rem,1fr)_auto]"
      >
        <Link
          href="/"
          className={`font-semibold ${darkMode ? "text-surface" : "text-primary"}`}
          aria-label="Diski Central home"
        >
          Diski Central
        </Link>

        <Link
          href="/leagues"
          prefetch={false}
          className={`col-start-2 row-start-1 text-center md:col-start-2 ${
            darkMode ? "text-surface" : "text-primary"
          }`}
        >
          Leagues
        </Link>

        <label className="col-span-2 row-start-2 md:col-span-1 md:col-start-3 md:row-start-1">
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-[20px] border border-secondary/30 bg-surface px-4 py-2 text-ink placeholder:text-secondary focus:outline-2 focus:outline-tertiary"
          />
        </label>

        <div className="col-span-2 row-start-3 flex justify-end gap-2 md:col-span-1 md:col-start-4 md:row-start-1">
          <button
            type="button"
            onClick={toggleDarkMode}
            disabled={isDarkModeToggleDisabled}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
            title="Theme switching is not available yet"
            className="ui-button ui-button--tertiary h-10 w-10 p-0"
          >
            <ThemeIcon size={16} aria-hidden="true" />
          </button>
          <Link href="/login" className="ui-button ui-button--secondary">
            Log in
          </Link>
          <Link href="/register" className="ui-button ui-button--primary">
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;