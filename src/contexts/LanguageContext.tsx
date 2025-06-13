"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import languageData from '../data/data.json';

export type Language = 'en' | 'nl';

export interface LanguageData {
  code: string;
  name: string;
  flag: string;
  header: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  about: {
    title: string;
    greeting: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    skillsTitle: string;
  };
  experience: {
    title: string;
    items: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    emailDescription: string;
    linkedin: string;
    linkedinDescription: string;
    github: string;
    githubDescription: string;
    preferText: string;
    directEmail: string;
    schedule: string;
  };
  footer: {
    copyright: string;
  };
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: LanguageData;
  availableLanguages: Array<{
    code: Language;
    name: string;
    flag: string;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && ['en', 'nl'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('nl')) {
        setCurrentLanguage('nl');
      } else {
        setCurrentLanguage('en');
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('portfolio-language', language);
  };

  const t = (languageData as any)[currentLanguage] as LanguageData;

  const availableLanguages = Object.keys(languageData).map(code => ({
    code: code as Language,
    name: (languageData as any)[code].name,
    flag: (languageData as any)[code].flag,
  }));

  const value = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
