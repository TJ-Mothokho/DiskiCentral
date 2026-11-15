"use client";

import { createContext, useContext } from "react";

export type ThemeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isDarkModeToggleDisabled: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeContext provider.");
  }

  return context;
}

export default ThemeContext;
