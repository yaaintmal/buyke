import { useLayoutEffect, useState } from 'react';

export type FilterType = 'all' | 'open' | 'bought';

export const useUIState = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const s = localStorage.getItem('theme');
      if (s === 'light') return 'light';
      if (s === 'dark') return 'dark';
      if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('theme-dark');
    else root.classList.remove('theme-dark');

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return { filter, setFilter, showSettings, setShowSettings, theme, setTheme } as const;
};

export default useUIState;
