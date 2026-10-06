"use client";

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { shelves, type Book } from "@/lib/goodreads";
import { BookCover, Stars } from "./BookCard";

type UpdateKind = "currentlyReading" | "finished" | "wantToRead";

const UPDATE_COUNT = 3;

export default function Reading() {
  const { t } = useLanguage();

  const { currentlyReading: current, read, toRead } = shelves;

  // Currently reading first, then the latest finished book and newest
  // to-read addition, topped up with more recently finished books.
  const updates: Array<{ kind: UpdateKind; book: Book }> = [
    ...current.map((book) => ({ kind: "currentlyReading" as const, book })),
    ...read.slice(0, 1).map((book) => ({ kind: "finished" as const, book })),
    ...toRead
      .filter((book) => !current.some((c) => c.url === book.url))
      .slice(0, 1)
      .map((book) => ({ kind: "wantToRead" as const, book })),
    ...read.slice(1).map((book) => ({ kind: "finished" as const, book })),
  ].slice(0, UPDATE_COUNT);

  return (
    <section id="reading" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            {t.reading.title}
          </h2>
          <p className="text-xl text-foreground/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            {t.reading.description}
          </p>

          <h3 className="text-2xl font-semibold mb-8 text-foreground">
            {t.reading.latestUpdates}
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
            {updates.map(({ kind, book }) => (
              <a
                key={`${kind}-${book.url}`}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
              >
                <BookCover book={book} className="w-16 h-24" />
                <div className="flex flex-col min-w-0">
                  <span className="self-start bg-primary-strong text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium mb-2">
                    {t.reading[kind]}
                  </span>
                  <h4 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-sm text-foreground/90 mt-1 truncate">
                    {t.reading.by} {book.author}
                  </p>
                  {kind === "finished" && book.rating > 0 && (
                    <div className="mt-auto pt-2">
                      <Stars rating={book.rating} />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          <Link
            href="/reading/"
            className="inline-block bg-primary-strong text-primary-foreground px-8 py-3 rounded-md hover:bg-primary-strong/90 transition-colors font-medium"
          >
            {t.reading.viewMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
