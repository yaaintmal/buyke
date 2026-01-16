import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export type FilterType = 'all' | 'open' | 'bought';

const getInitialExtendedFunctions = (): boolean => {
  try {
    const saved = localStorage.getItem('extendedFunctions');
    return saved !== null ? JSON.parse(saved) : true;
  } catch {
    return true;
  }
};

export const useUIState = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [extendedFunctions, setExtendedFunctions] = useState<boolean>(getInitialExtendedFunctions);

  // theme is managed by ThemeProvider; expose the provider's values via the hook
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    // keep localStorage in sync (ThemeProvider also does this but it's harmless to ensure consistency)
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('extendedFunctions', JSON.stringify(extendedFunctions));
    } catch {
      // ignore
    }
  }, [theme, extendedFunctions]);

  return {
    filter,
    setFilter,
    showSettings,
    setShowSettings,
    theme,
    setTheme,
    extendedFunctions,
    setExtendedFunctions,
  } as const;
};

export default useUIState;
