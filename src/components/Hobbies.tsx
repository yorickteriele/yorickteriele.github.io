"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hobbies() {
  const { t } = useLanguage();

  return (
    <section id="hobbies" className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-3 text-foreground">
            {t.hobbies.title}
          </h3>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            {t.hobbies.description}
          </p>
          <Link
            href="/hobbies"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            {t.hobbies.cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
