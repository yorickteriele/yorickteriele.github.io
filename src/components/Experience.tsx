"use client";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown, ExternalLink } from "lucide-react";
import ExperienceDetailRenderer from "./ExperienceDetailRenderer";

type ExperienceCategory = "all" | "education" | "work" | "certificate";

export default function Experience() {
  const { t, experienceItems } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<ExperienceCategory>("all");
  const categories: Array<{ key: ExperienceCategory; label: string }> = [
    { key: "all", label: t.experience.all },
    { key: "education", label: t.experience.education },
    { key: "work", label: t.experience.work },
    { key: "certificate", label: t.experience.certificates },
  ];
  const visibleItems = experienceItems.filter(
    (exp) => activeCategory === "all" || exp.category === activeCategory,
  );

  const renderExperienceCard = (
    exp: (typeof experienceItems)[number],
    key: string,
  ) => {
    const isOpen = openKey === key;

    return (
      <div
        key={key}
        className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
            <div className="flex flex-1 gap-4">
              {exp.logo && (
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/80 p-2 shadow-sm">
                  <Image
                    src={exp.logo}
                    alt={exp.logoAlt || ""}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {exp.title}
                </h4>
                <p className="text-lg text-primary font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  {exp.company}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center text-muted-foreground bg-secondary/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-border/50">
              {exp.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-foreground/80 mb-5 leading-relaxed">
            {exp.description}
          </p>

          {/* Technologies */}
          {exp.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {exp.technologies.map((tech: string, techIndex: number) => (
                <span
                  key={tech}
                  className="bg-accent/20 text-accent px-3 py-1.5 rounded-lg text-sm font-medium border border-accent/30 hover:bg-accent/30 hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${techIndex * 50}ms`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {exp.links && exp.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-5">
              {exp.links.map((link) => (
                <a
                  key={`${exp.title}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/20"
                >
                  {link.label}
                  <ExternalLink className="h-4 w-4 text-primary" aria-hidden />
                </a>
              ))}
            </div>
          )}

          {/* Expandable section trigger */}
          {exp.detailType && exp.detailContent && (
            <button
              onClick={() => setOpenKey(isOpen ? null : key)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group/btn"
            >
              <span className="font-semibold text-foreground group-hover/btn:text-primary transition-colors duration-300">
                {isOpen ? t.experience.showLess : t.experience.viewDetails}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-500 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          )}

          {/* Expandable content */}
          {exp.detailType && exp.detailContent && (
            <div
              className={`
                grid transition-all duration-500 ease-in-out
                ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}
              `}
            >
              <div className="overflow-hidden">
                <div
                  className={`
                    bg-secondary/30 backdrop-blur-sm rounded-lg p-5 border border-border/50
                    transform transition-all duration-500
                    ${isOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}
                  `}
                >
                  <ExperienceDetailRenderer
                    detailType={exp.detailType}
                    content={exp.detailContent}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground bg-clip-text">
            {t.experience.title}
          </h2>

          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            role="tablist"
            aria-label={t.experience.title}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.key;

              return (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category.key);
                    setOpenKey(null);
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card/70 text-foreground border-border hover:border-primary/50 hover:bg-secondary/60"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            {visibleItems.map((exp, index) =>
              renderExperienceCard(exp, `${activeCategory}-${index}`),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
