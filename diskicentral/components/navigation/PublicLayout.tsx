"use client";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((d) => !d);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen ${darkMode ? "bg-black" : "bg-surface"}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {children}
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}
