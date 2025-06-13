"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  
  // Static project data that doesn't change between languages
  const projectsStaticData = [
    {
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
      github: "https://github.com/yorickteriele/ecommerce-platform",
      demo: "https://ecommerce-demo.vercel.app",
      featured: true
    },
    {
      image: "/api/placeholder/400/300",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/yorickteriele/task-manager",
      demo: "https://task-manager-demo.vercel.app",
      featured: true
    },
    {
      image: "/api/placeholder/400/300",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS3"],
      github: "https://github.com/yorickteriele/weather-dashboard",
      demo: "https://weather-dashboard-demo.vercel.app",
      featured: false
    },
    {
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/yorickteriele/portfolio",
      demo: "https://yorickteriele.dev",
      featured: false
    }
  ];

  // Combine translated data with static data
  const projects = t.projects.items.map((project, index) => ({
    ...project,
    ...projectsStaticData[index]
  }));

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            {t.projects.title}
          </h2>
          
          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background text-foreground px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Live Demo
                      </Link>
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background text-foreground px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold text-center mb-12 text-foreground">
                Other Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {project.title}
                    </h4>
                    <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                      >
                        Live Demo →
                      </Link>
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
                      >
                        GitHub →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
