"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

const profile = {
  name: "Yorick te Riele",
  birthDate: {
    en: "July 6, 2006",
    nl: "6 juli 2006",
  },
  region: "Zwolle",
  linkedin: "www.linkedin.com/in/yorickteriele/",
  portfolio: "www.yorickteriele.nl/",
  skills: [
    "C#",
    "Java",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    ".NET",
    "SQL",
    "PostgreSQL",
    "Docker",
  ],
};

const labels = {
  en: {
    cv: "Curriculum Vitae",
    personal: "Personal Details",
    name: "Name:",
    birthDate: "Date of birth:",
    region: "Region:",
    linkedin: "LinkedIn:",
    portfolio: "Portfolio:",
    intro: "Introduction",
    education: "Education",
    experience: "Work Experience",
    certificates: "Certificates",
    projects: "Projects",
    skills: "Skills and Competencies",
    technicalSkills: "Technical skills:",
    professionalSkills: "Professional skills:",
    languages: "Languages:",
    projectIntro:
      "My personal and study projects, including more information, are available at:",
    professionalText:
      "Experienced in teamwork, Scrum, analytical thinking, and problem solving.",
    languageText: "Dutch (native), English (fluent)",
  },
  nl: {
    cv: "Curriculum Vitae",
    personal: "Persoonlijke Gegevens",
    name: "Naam:",
    birthDate: "Geboortedatum:",
    region: "Regio:",
    linkedin: "LinkedIn:",
    portfolio: "Portfolio:",
    intro: "Introductie",
    education: "Opleidingen",
    experience: "Werkervaring",
    certificates: "Certificaten",
    projects: "Projects",
    skills: "Vaardigheden en Competenties",
    technicalSkills: "Technische vaardigheden:",
    professionalSkills: "Professionele vaardigheden:",
    languages: "Talen:",
    projectIntro:
      "Mijn persoonlijke en studieprojecten, waaronder meer informatie, zijn te vinden op:",
    professionalText:
      "Veel ervaring met werken in teamverband, Scrum, analytisch denken en probleemoplossing.",
    languageText: "Nederlands (moedertaal), Engels (vloeiend)",
  },
};

type CVExperienceItem = ReturnType<typeof useLanguage>["experienceItems"][number];

function CVExperienceRow({ item }: { item: CVExperienceItem }) {
  return (
    <div className="cv-row">
      <div>{item.period}</div>
      <div>
        <strong>{item.title}</strong>, {item.company}
        {item.links && item.links.length > 0 && (
          <div className="cv-links">
            {item.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CVPrint() {
  const { locale, t, experienceItems, projectItems } = useLanguage();
  const l = labels[locale];
  const education = experienceItems.filter(
    (item) => item.category === "education",
  );
  const workExperience = experienceItems.filter(
    (item) => item.category === "work",
  );
  const certificates = experienceItems.filter(
    (item) => item.category === "certificate",
  );

  return (
    <article className="cv-print" aria-label={l.cv}>
      <header className="cv-header">
        <div>
          <h1>{profile.name}</h1>
        </div>
        <p>{l.cv}</p>
      </header>

      <section className="cv-section">
        <h2>{l.personal}</h2>
        <div className="cv-personal">
          <dl>
            <div>
              <dt>{l.name}</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>{l.birthDate}</dt>
              <dd>{profile.birthDate[locale]}</dd>
            </div>
            <div>
              <dt>{l.region}</dt>
              <dd>{profile.region}</dd>
            </div>
            <div>
              <dt>{l.linkedin}</dt>
              <dd>
                <a href={`https://${profile.linkedin}`}>{profile.linkedin}</a>
              </dd>
            </div>
            <div>
              <dt>{l.portfolio}</dt>
              <dd>
                <a href={`https://${profile.portfolio}`}>{profile.portfolio}</a>
              </dd>
            </div>
          </dl>
          <Image src="/Foto 1.png" alt="" width={320} height={472} priority />
        </div>
      </section>

      <section className="cv-section cv-intro">
        <h2>{l.intro}</h2>
        <p>{t.about.paragraph1}</p>
        <p>{t.about.paragraph2}</p>
      </section>

      <section className="cv-section">
        <h2>{l.education}</h2>
        {education.map((item) => (
          <CVExperienceRow item={item} key={`${item.period}-${item.title}`} />
        ))}
      </section>

      <section className="cv-section">
        <h2>{l.experience}</h2>
        {workExperience.map((item) => (
          <CVExperienceRow item={item} key={`${item.period}-${item.company}`} />
        ))}
      </section>

      {certificates.length > 0 && (
        <section className="cv-section">
          <h2>{l.certificates}</h2>
          {certificates.map((item) => (
            <CVExperienceRow item={item} key={`${item.period}-${item.company}`} />
          ))}
        </section>
      )}

      <section className="cv-section cv-page-break">
        <h2>{l.projects}</h2>
        <p>{l.projectIntro}</p>
        <a href={`https://${profile.portfolio}`}>{profile.portfolio}</a>
        <ul>
          {projectItems
            .filter((project) => project.featured)
            .map((project) => (
              <li key={project.title}>
                <strong>{project.title}</strong>
                {project.technologies.length > 0 &&
                  `: ${project.technologies.join(", ")}`}
              </li>
            ))}
        </ul>
      </section>

      <section className="cv-section">
        <h2>{l.skills}</h2>
        <p>
          <strong>{l.technicalSkills}</strong> {profile.skills.join(", ")}.
        </p>
        <p>
          <strong>{l.professionalSkills}</strong> {l.professionalText}
        </p>
        <p>
          <strong>{l.languages}</strong> {l.languageText}
        </p>
      </section>
    </article>
  );
}
