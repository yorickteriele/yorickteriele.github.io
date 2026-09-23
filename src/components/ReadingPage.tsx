"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { shelfUrl, useGoodreadsShelf, type Book, type Shelf } from "@/lib/goodreads";
import { fallbackRead, fallbackToRead } from "@/data/goodreads-fallback";
import shelfCounts from "@/data/goodreads-counts.json";
import BookCard from "./BookCard";

// Two rows at every breakpoint: 2, 3 and 5 columns.
const SHELF_SIZE = 10;
// Books loaded live per shelf. The full totals come from
// goodreads-counts.json, refreshed on every deploy.
const COUNT_LIMIT = 100;

function visibilityClass(index: number) {
  if (index >= 6) return "hidden lg:flex";
  if (index >= 4) return "hidden sm:flex";
  return "";
}

function ShelfSection({
  id,
  title,
  shelf,
  books,
  total,
  currentlyReading = [],
}: {
  id: string;
  title: string;
  shelf: Shelf;
  books: Book[];
  total: number;
  currentlyReading?: Book[];
}) {
  const { t } = useLanguage();
  const items = [
    ...currentlyReading.map((book) => ({ book, tag: t.reading.currentlyReading })),
    // A book being read can still show up on the to-read shelf; list it once.
    ...books
      .filter((book) => !currentlyReading.some((current) => current.url === book.url))
      .map((book) => ({ book, tag: undefined })),
  ];

  return (
    <section id={id} className="mb-20">
      <div className="flex items-center justify-between gap-4 mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-bold text-foreground">
          {title}
          <span className="ml-3 text-lg font-medium text-foreground/60">
            {Math.max(total, items.length)}
          </span>
        </h2>
        <a
          href={shelfUrl(shelf)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          {t.reading.viewMore}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.slice(0, SHELF_SIZE).map(({ book, tag }, index) => (
            <BookCard
              key={book.url}
              book={book}
              byLabel={t.reading.by}
              tag={tag}
              className={visibilityClass(index)}
            />
          ))}
        </div>
      ) : (
        <p className="text-foreground/70">{t.reading.empty}</p>
      )}
    </section>
  );
}

export default function ReadingPage() {
  const { t } = useLanguage();

  const read = useGoodreadsShelf(
    { shelf: "read", widgetId: "1790153628", numBooks: COUNT_LIMIT, sort: "date_read" },
    fallbackRead,
  );
  const current = useGoodreadsShelf(
    { shelf: "currently-reading", widgetId: "1790153907", numBooks: SHELF_SIZE, sort: "date_updated" },
    [],
  );
  const toRead = useGoodreadsShelf(
    { shelf: "to-read", widgetId: "1790153906", numBooks: COUNT_LIMIT, sort: "date_added" },
    fallbackToRead,
  );

  return (
    <div className="pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/#reading"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.reading.backHome}
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t.reading.title}
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              {t.reading.description}
            </p>
          </div>

          <ShelfSection id="to-read" title={t.reading.toRead} shelf="to-read" books={toRead} total={shelfCounts.toRead} currentlyReading={current} />
          <ShelfSection id="read" title={t.reading.read} shelf="read" books={read} total={shelfCounts.read} />
        </div>
      </div>
    </div>
  );
}
