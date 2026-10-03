"use client";

import GoodreadsWidget from "./GoodreadsWidget";
import { GOODREADS_PROFILE_URL } from "../lib/goodreads";
import { STRAVA_PROFILE_URL } from "../lib/strava";
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
          <p className="text-foreground/80 max-w-2xl mx-auto mb-6 leading-relaxed">
            {t.hobbies.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href={GOODREADS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-5 py-2.5 rounded-md hover:bg-card transition-colors font-medium"
            >
              Goodreads
            </a>
            <a
              href={STRAVA_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-5 py-2.5 rounded-md hover:bg-card transition-colors font-medium"
            >
              Strava
            </a>
          </div>

          <GoodreadsWidget />
        </div>
      </div>
    </section>
  );
}
