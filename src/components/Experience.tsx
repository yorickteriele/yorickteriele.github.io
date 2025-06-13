"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  
  // Define static technologies for each experience
  const experienceTechnologies = [
    ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
    ["JavaScript", "React", "Express.js", "MongoDB", "Docker"],
    ["HTML/CSS", "JavaScript", "PHP", "MySQL", "Git"]
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            {t.experience.title}
          </h2>
          
          <div className="space-y-8">
            {t.experience.items.map((exp, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg text-primary font-medium">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experienceTechnologies[index]?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
