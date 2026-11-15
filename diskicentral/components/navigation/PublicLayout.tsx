"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import ThemeContext from "@/themes/ThemeContext";
import NavBar from "./NavBar";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isDarkModeToggleDisabled = true;
  const toggleDarkMode = useCallback(
    () => setDarkMode((current) => !current),
    [],
  );

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        isDarkModeToggleDisabled,
      }}>
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? "dark bg-primary text-surface" : "bg-canvas text-ink"
        }`}
        data-theme={darkMode ? "dark" : "light"}>
        <NavBar />

        <div className="flex-1">{children}</div>

        <Footer darkMode={darkMode} />
      </div>
    </ThemeContext.Provider>
  );
}
