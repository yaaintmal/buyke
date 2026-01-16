import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export type FilterType = 'all' | 'open' | 'bought';

export const useUIState = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // theme is managed by ThemeProvider; expose the provider's values via the hook
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    // keep localStorage in sync (ThemeProvider also does this but it's harmless to ensure consistency)
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return { filter, setFilter, showSettings, setShowSettings, theme, setTheme } as const;
};

export default useUIState;
