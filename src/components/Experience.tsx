"use client";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground bg-clip-text">
            {t.experience.title}
          </h2>
          
          <div className="space-y-6">
            {t.experience.items.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-6">
                  {/* Header section */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg text-primary font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        {exp.company}
                      </h4>
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
                            animationDelay: `${techIndex * 50}ms`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expandable section trigger */}
                  {exp.moreInfo && (
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group/btn"
                    >
                      <span className="font-semibold text-foreground group-hover/btn:text-primary transition-colors duration-300">
                        {openIndex === index ? "Show less" : "View details"}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-primary transition-transform duration-500 ${
                          openIndex === index ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  )}

                  {/* Expandable content */}
                  {exp.moreInfo && (
                    <div
                      className={`
                        grid transition-all duration-500 ease-in-out
                        ${openIndex === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}
                      `}
                    >
                      <div className="overflow-hidden">
                        <div 
                          className={`
                            bg-secondary/30 backdrop-blur-sm rounded-lg p-5 border border-border/50
                            transform transition-all duration-500
                            ${openIndex === index ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}
                          `}
                          dangerouslySetInnerHTML={{ __html: exp.moreInfo }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}