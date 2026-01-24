// Locale types
export type Locale = 'en' | 'nl';

// Common translations
export interface CommonTranslations {
  code: string;
  name: string;
  flag: string;
}

// Header translations
export interface HeaderTranslations {
  about: string;
  experience: string;
  projects: string;
  contact: string;
}

// Hero translations
export interface HeroTranslations {
  greeting: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

// About translations
export interface AboutTranslations {
  title: string;
  greeting: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  skillsTitle: string;
}

// Experience translations
export interface ExperienceTranslations {
  title: string;
}

// Projects translations
export interface ProjectsTranslations {
  title: string;
}

// Contact translations
export interface ContactTranslations {
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
}

// Footer translations
export interface FooterTranslations {
  copyright: string;
}

// Complete translations structure
export interface Translations {
  common: CommonTranslations;
  header: HeaderTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  experience: ExperienceTranslations;
  projects: ProjectsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}

// Experience item with localized fields
export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: Record<Locale, string>;
  technologies: string[];
  detailType?: string;
  detailContent?: Record<Locale, Record<string, unknown>>;
}

// Project item with localized fields
export interface ProjectItem {
  title: string;
  description: Record<Locale, string>;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
}
