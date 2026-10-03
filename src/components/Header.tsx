"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsHidden(scrollY > lastScrollY && scrollY > 100);
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHome) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navLinkClass =
    "text-foreground hover:text-primary transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } md:translate-y-0 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Yorick te Riele
          </Link>          
          <div className="hidden md:flex items-center space-x-8">
            {isHome ? (
              <>
                <button onClick={() => scrollToSection("about")} className={navLinkClass}>
                  {t.header.about}
                </button>
                <button onClick={() => scrollToSection("experience")} className={navLinkClass}>
                  {t.header.experience}
                </button>
                <button onClick={() => scrollToSection("projects")} className={navLinkClass}>
                  {t.header.projects}
                </button>
              </>
            ) : (
              <>
                <Link href="/#about" className={navLinkClass}>
                  {t.header.about}
                </Link>
                <Link href="/#experience" className={navLinkClass}>
                  {t.header.experience}
                </Link>
                <Link href="/#projects" className={navLinkClass}>
                  {t.header.projects}
                </Link>
              </>
            )}
            {isHome ? (
              <button onClick={() => scrollToSection("contact")} className={navLinkClass}>
                {t.header.contact}
              </button>
            ) : (
              <Link href="/#contact" className={navLinkClass}>
                {t.header.contact}
              </Link>
            )}
            {isHome ? (
              <button onClick={() => scrollToSection("reading")} className={navLinkClass}>
                {t.header.reading}
              </button>
            ) : (
              <Link href="/#reading" className={navLinkClass}>
                {t.header.reading}
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
          {/* 
          <div className="md:hidden">
            <button className="text-foreground hover:text-primary">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div> */}
        </div>
      </nav>
    </header>
  );
}