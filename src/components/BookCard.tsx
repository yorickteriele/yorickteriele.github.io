"use client";

import { BookOpen, Star } from "lucide-react";
import type { Book } from "@/lib/goodreads";

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? "fill-primary text-primary" : "text-border"}`}
        />
      ))}
    </div>
  );
}

export function BookCover({ book, className }: { book: Book; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-md border border-border bg-muted shadow-md ${className}`}>
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <BookOpen className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

export default function BookCard({ book, byLabel }: { book: Book; byLabel: string }) {
  return (
    <a
      href={book.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <BookOpen className="w-8 h-8" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-foreground/70 mt-1 mb-3">
          {byLabel} {book.author}
        </p>
        {book.rating > 0 && (
          <div className="mt-auto">
            <Stars rating={book.rating} />
          </div>
        )}
      </div>
    </a>
  );
}
