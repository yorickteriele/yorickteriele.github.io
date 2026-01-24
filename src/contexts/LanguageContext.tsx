"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale, Translations } from '@/types/i18n';
import { 
  getTranslations, 
  getExperienceItems, 
  getProjectItems, 
  detectBrowserLocale,
  isValidLocale,
  defaultLocale 
} from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  experienceItems: ReturnType<typeof getExperienceItems>;
  projectItems: ReturnType<typeof getProjectItems>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setCurrentLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Load saved locale from localStorage or detect browser locale
    const saved = localStorage.getItem('portfolio-locale');
    if (saved && isValidLocale(saved)) {
      setCurrentLocale(saved);
    } else {
      setCurrentLocale(detectBrowserLocale());
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    localStorage.setItem('portfolio-locale', newLocale);
  };

  const t = getTranslations(locale);
  const experienceItems = getExperienceItems(locale);
  const projectItems = getProjectItems(locale);

  return (
    <LanguageContext.Provider 
      value={{ 
        locale, 
        setLocale, 
        t, 
        experienceItems, 
        projectItems 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
