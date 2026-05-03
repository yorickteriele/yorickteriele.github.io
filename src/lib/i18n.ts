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
  category: 'education' | 'work' | 'certificate';
  description: string;
  technologies: string[];
  logo?: string;
  logoAlt?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  detailType?: string;
  detailContent?: Record<string, unknown>;
}> {
  const getStartYear = (period: string): number => {
    const match = period.match(/\d{4}/);
    return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
  };

  return (experienceData as ExperienceItem[])
    .map(item => ({
      title: item.title,
      company: item.company,
      period: item.period,
      category: item.category || 'work',
      description: item.description[locale] || item.description[defaultLocale],
      technologies: item.technologies,
      logo: item.logo,
      logoAlt: item.logoAlt?.[locale] || item.logoAlt?.[defaultLocale],
      links: item.links?.map(link => ({
        label: link.label[locale] || link.label[defaultLocale],
        href: link.href,
      })),
      detailType: item.detailType,
      detailContent: item.detailContent?.[locale] || item.detailContent?.[defaultLocale],
    }))
    .sort((a, b) => getStartYear(b.period) - getStartYear(a.period));
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
