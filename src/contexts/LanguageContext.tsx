"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import data from '../data/data.json';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof data.en;
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
  const [language, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-language') as Language;
    if (saved && (saved === 'en' || saved === 'nl')) {
      setCurrentLanguage(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setCurrentLanguage(browserLang.startsWith('nl') ? 'nl' : 'en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = data[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
