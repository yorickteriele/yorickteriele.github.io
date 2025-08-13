"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  
  const projectsStaticData = [
    {
      image: "/Superelf.png",
      technologies: ["C#", ".NET", "Node.js", "PostgreSQL", "GitHub Actions"],
      github: "https://github.com/yorickteriele/Superelf",
      demo: "https://superelf.yorickteriele.nl",
      featured: true
    },
    {
      image: "/CaveRooms.png",
      technologies: ["Unity", "C#", "Procedural Generation", "Voronoi Diagrams", "Perlin Noise", "Cellular Automata"],
      github: "https://github.com/yorickteriele/CaveGame",
      demo: "#",
      featured: true
    },
    {
      image: "/Portfolio.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/yorickteriele/yorickteriele.github.io",
      demo: "#",
      featured: false
    }
  ];

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
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={`${project.title} screenshot`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback in case image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18945a6d4b3%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%3Bfont-size%3A16px%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18945a6d4b3%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23333%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22290.5"';
                    }}
                  />
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
