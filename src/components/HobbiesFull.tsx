"use client";

import GoodreadsWidget from "./GoodreadsWidget";
import { useLanguage } from "../contexts/LanguageContext";

export default function HobbiesFull() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {t.hobbies.title}
          </h1>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.hobbies.description}
          </p>

          <GoodreadsWidget />
        </div>
      </div>
    </section>
  );
}
