import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_LANGUAGE } from '../config';

export type Lang = 'de' | 'en';

const StorageKey = 'language';

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: DEFAULT_LANGUAGE, setLang: () => {} });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(StorageKey) as Lang | null;
      if (stored === 'de' || stored === 'en') return stored;
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(StorageKey, lang);
    } catch {}
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  return useContext(LanguageContext);
}
