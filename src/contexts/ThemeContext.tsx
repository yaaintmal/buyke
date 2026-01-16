import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes } from '../themes';
import type { ThemeName } from '../themes';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'light' || s === 'dark' || s === 'highContrast') return s as ThemeName;
      if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    const vars = themes[theme];
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));
    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: ThemeName) => setThemeState(t);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
