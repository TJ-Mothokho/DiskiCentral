"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import ThemeContext from "@/themes/ThemeContext";
import NavBar from "./NavBar";
import { AuthProvider } from "@/context/AuthContext";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return <>{children}</>;
  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode: () => undefined, isDarkModeToggleDisabled: true }}>
        <div className="min-h-screen bg-canvas text-ink">
          <NavBar />
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <Footer darkMode={false} />
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
