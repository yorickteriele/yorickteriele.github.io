import type { Locale, Translations, ExperienceItem, ProjectItem } from '@/types/i18n';
import enTranslations from '@/locales/en.json';
import nlTranslations from '@/locales/nl.json';
import experienceData from '@/locales/experience.json';
import projectsData from '@/locales/projects.json';

// Available locales
export const locales: Locale[] = ['en', 'nl'];
export const defaultLocale: Locale = 'en';

// Translation resources
const translations: Record<Locale, Translations> = {
  en: enTranslations as Translations,
  nl: nlTranslations as Translations,
};

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}

/**
 * Get experience items with localized content
 */
export function getExperienceItems(locale: Locale): Array<{
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  detailType?: string;
  detailContent?: Record<string, unknown>;
}> {
  return (experienceData as ExperienceItem[]).map(item => ({
    title: item.title,
    company: item.company,
    period: item.period,
    description: item.description[locale] || item.description[defaultLocale],
    technologies: item.technologies,
    detailType: item.detailType,
    detailContent: item.detailContent?.[locale] || item.detailContent?.[defaultLocale],
  }));
}

/**
 * Get project items with localized content
 */
export function getProjectItems(locale: Locale): Array<{
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
}> {
  return (projectsData as ProjectItem[]).map(item => ({
    title: item.title,
    description: item.description[locale] || item.description[defaultLocale],
    image: item.image,
    technologies: item.technologies,
    github: item.github,
    demo: item.demo,
    featured: item.featured,
  }));
}

/**
 * Detect user's preferred locale from browser settings
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check if browser language starts with any of our supported locales
  for (const locale of locales) {
    if (browserLang.startsWith(locale)) {
      return locale;
    }
  }
  
  return defaultLocale;
}

/**
 * Validate if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
