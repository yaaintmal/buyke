import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export type FilterType = 'all' | 'open' | 'bought';

import { DEFAULT_EXTENDED_FUNCTIONS } from '../config';

const getInitialExtendedFunctions = (): boolean => {
  try {
    const saved = localStorage.getItem('extendedFunctions');
    return saved !== null ? JSON.parse(saved) : DEFAULT_EXTENDED_FUNCTIONS;
  } catch {
    return DEFAULT_EXTENDED_FUNCTIONS;
  }
};

export const useUIState = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [extendedFunctions, setExtendedFunctions] = useState<boolean>(getInitialExtendedFunctions);
  const [currentListId, setCurrentListId] = useState<string | null>(() => {
    // Check URL first
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const urlId = url.searchParams.get('list');
      if (urlId) return urlId;
    }
    try {
      const saved = localStorage.getItem('listId');
      return saved || null;
    } catch {
      return null;
    }
  });

  // theme is managed by ThemeProvider; expose the provider's values via the hook
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    // keep localStorage in sync (ThemeProvider also does this but it's harmless to ensure consistency)
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('extendedFunctions', JSON.stringify(extendedFunctions));
      if (currentListId) localStorage.setItem('listId', currentListId);
      else localStorage.removeItem('listId');
    } catch {
      // ignore
    }
  }, [theme, extendedFunctions, currentListId]);

  return {
    filter,
    setFilter,
    showSettings,
    setShowSettings,
    theme,
    setTheme,
    extendedFunctions,
    setExtendedFunctions,
    currentListId,
    setCurrentListId,
  } as const;
};

export default useUIState;
