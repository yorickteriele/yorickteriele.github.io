"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className={`container mx-auto px-6 z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left side - Text content */}
          <div className="text-left order-2 md:order-1">
            <p className="text-lg md:text-xl text-muted-foreground mb-4">{t.hero.greeting}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary/90 to-accent bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">{t.hero.subtitle}</h2>
            <p className="text-base md:text-lg text-foreground/80 mb-8 leading-relaxed">{t.hero.description}</p>
          </div>

          {/* Right side - Photo */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <img
                src="/portrait foto.jpg"
                alt="Portrait of me"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Buttons centered under grid */}
        <div className="flex flex-col flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.projects.title}
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/50 transition-colors"
          >
            {t.hero.cta}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  );
}