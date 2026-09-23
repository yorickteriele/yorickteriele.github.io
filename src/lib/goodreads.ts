"use client";

import { useEffect, useState } from "react";

export const GOODREADS_USER_ID = "192543272";
export const GOODREADS_PROFILE_URL = `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}-yorick-te-riele`;

export type Shelf = "read" | "to-read" | "currently-reading";

export interface Book {
  title: string;
  author: string;
  cover: string;
  url: string;
  rating: number;
}

interface ShelfOptions {
  shelf: Shelf;
  // Goodreads injects the widget markup into #gr_custom_widget_<widgetId>.
  widgetId: string;
  numBooks: number;
  sort: "date_added" | "date_read" | "date_updated";
}

export function shelfUrl(shelf: Shelf) {
  return `https://www.goodreads.com/review/list/${GOODREADS_USER_ID}-yorick-te-riele?shelf=${shelf}`;
}

function widgetScriptUrl({ shelf, widgetId, numBooks, sort }: ShelfOptions) {
  const params = new URLSearchParams({
    cover_position: "left",
    cover_size: "small",
    num_books: String(numBooks),
    order: "d",
    shelf,
    show_author: "1",
    show_cover: "1",
    show_rating: "1",
    show_review: "0",
    show_tags: "0",
    show_title: "1",
    sort,
    widget_id: widgetId,
  });
  return `https://www.goodreads.com/review/custom_widget/${GOODREADS_USER_ID}.${shelf}?${params}`;
}

// Goodreads serves "_SY75_"-style thumbnails; dropping the suffix gives the full cover.
function fullSizeCover(src: string) {
  return src.replace(/\._S[XY]\d+_(?=\.\w+$)/, "");
}

function parseWidget(container: HTMLElement): Book[] {
  const entries = container.querySelectorAll<HTMLElement>(
    '[class^="gr_custom_each_container"]',
  );

  return Array.from(entries).map((entry) => {
    const titleLink = entry.querySelector<HTMLAnchorElement>('[class^="gr_custom_title"] a');
    const authorLink = entry.querySelector<HTMLAnchorElement>('[class^="gr_custom_author"] a');
    const cover = entry.querySelector<HTMLImageElement>('[class^="gr_custom_book_container"] img');
    const activeStars = entry.querySelectorAll('[class^="gr_custom_rating"] img[src*="star_active"]');

    return {
      title: titleLink?.textContent?.trim() ?? "",
      author: authorLink?.textContent?.trim() ?? "",
      cover: cover ? fullSizeCover(cover.src) : "",
      url: titleLink?.href.split("?")[0] ?? "",
      rating: activeStars.length,
    };
  }).filter((book) => book.title);
}

/**
 * Loads a Goodreads shelf live in the browser by running Goodreads' own
 * custom-widget script into a hidden container, then parsing its markup so
 * it can be rendered with the site's styling. Returns `fallback` until the
 * live data arrives, or if Goodreads can't be reached.
 */
export function useGoodreadsShelf(options: ShelfOptions, fallback: Book[]) {
  const [books, setBooks] = useState<Book[]>(fallback);
  const src = widgetScriptUrl(options);

  useEffect(() => {
    const container = document.createElement("div");
    container.id = `gr_custom_widget_${options.widgetId}`;
    container.hidden = true;
    document.body.appendChild(container);

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      const parsed = parseWidget(container);
      if (parsed.length > 0 || container.childElementCount > 0) {
        setBooks(parsed);
      }
      container.remove();
    };
    script.onerror = () => container.remove();
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.remove();
      container.remove();
    };
  }, [src, options.widgetId]);

  return books;
}
