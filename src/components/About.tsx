"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const skills = [
    "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python",
    ".NET/C#", "SQL", "PostgreSQL", "Docker", "Java"
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            {t.about.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {t.about.greeting}
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {t.about.paragraph2}
              </p>
              <p className="text-foreground/80 leading-relaxed">
                {t.about.paragraph3}
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                {t.about.skillsTitle}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="bg-card border border-border rounded-lg p-3 text-center hover:bg-accent/10 transition-colors"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <span className="text-foreground font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
