"use client";

import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ThemeContext from "@/themes/ThemeContext";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((d) => !d);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}>
      <div className={darkMode ? "dark" : ""}>
        <div className={`min-h-screen ${darkMode ? "bg-black" : "bg-surface"}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {children}

          <Footer darkMode={darkMode} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
