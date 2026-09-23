"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { shelfUrl, useGoodreadsShelf, type Book, type Shelf } from "@/lib/goodreads";
import { fallbackRead, fallbackToRead } from "@/data/goodreads-fallback";
import BookCard from "./BookCard";

const SHELF_SIZE = 50;

function ShelfSection({
  id,
  title,
  shelf,
  books,
}: {
  id: string;
  title: string;
  shelf: Shelf;
  books: Book[];
}) {
  const { t } = useLanguage();

  return (
    <section id={id} className="mb-20">
      <div className="flex items-baseline justify-between gap-4 mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-bold text-foreground">
          {title}
          <span className="ml-3 text-lg font-medium text-foreground/60">{books.length}</span>
        </h2>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {books.map((book) => (
            <BookCard key={book.url} book={book} byLabel={t.reading.by} />
          ))}
        </div>
      ) : (
        <p className="text-foreground/70 mb-10">{t.reading.empty}</p>
      )}

      <div className="text-center">
        <a
          href={shelfUrl(shelf)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          {t.reading.viewMore}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

export default function ReadingPage() {
  const { t } = useLanguage();

  const read = useGoodreadsShelf(
    { shelf: "read", widgetId: "1790153628", numBooks: SHELF_SIZE, sort: "date_read" },
    fallbackRead,
  );
  const toRead = useGoodreadsShelf(
    { shelf: "to-read", widgetId: "1790153906", numBooks: SHELF_SIZE, sort: "date_added" },
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

          <ShelfSection id="read" title={t.reading.read} shelf="read" books={read} />
          <ShelfSection id="to-read" title={t.reading.toRead} shelf="to-read" books={toRead} />
        </div>
      </div>
    </div>
  );
}
