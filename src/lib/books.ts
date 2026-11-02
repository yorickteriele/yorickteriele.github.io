import goodreadsData from "@/data/goodreads.json";
import hardcoverData from "@/data/hardcover.json";
import { goodreadsShelfUrl, type Shelf } from "./goodreads";

export type { Shelf };

export interface Book {
  title: string;
  author: string;
  cover: string;
  url: string;
  rating: number;
}

// Snapshots written at build time by scripts/goodreads.mjs and
// scripts/hardcover.mjs (refreshed nightly). Dates are epoch ms, 0 if unknown.
interface SourceBook extends Book {
  readAt?: number;
  addedAt?: number;
}

interface Source {
  currentlyReading: SourceBook[];
  read: SourceBook[];
  toRead: SourceBook[];
}

const goodreads = goodreadsData as Source;
const hardcover = hardcoverData as Source & { username: string };

export const HARDCOVER_USERNAME = hardcover.username;

const HARDCOVER_SHELF: Record<Shelf, string> = {
  read: "read",
  "to-read": "want-to-read",
  "currently-reading": "currently-reading",
};

export function shelfLinks(shelf: Shelf) {
  return [
    { label: "Goodreads", href: goodreadsShelfUrl(shelf) },
    ...(HARDCOVER_USERNAME
      ? [{ label: "Hardcover", href: `https://hardcover.app/@${HARDCOVER_USERNAME}/books/${HARDCOVER_SHELF[shelf]}` }]
      : []),
  ];
}

// Same book on both sites: compare the title without series info or subtitle,
// plus the first author's last name.
function bookKey(book: Book) {
  const normalize = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");
  const title = book.title.replace(/\s*\(.*?\)\s*/g, " ").split(/[:–—]/)[0];
  const author = book.author.split(",")[0].trim().split(/\s+/).pop() ?? "";
  return `${normalize(title)}|${normalize(author)}`;
}

type Status = "read" | "currentlyReading" | "toRead";
// When the two sites disagree, the furthest status wins.
const RANK: Record<Status, number> = { toRead: 0, currentlyReading: 1, read: 2 };

interface Entry {
  book: SourceBook;
  status: Status;
}

function merge(): Record<Status, SourceBook[]> {
  const entries = new Map<string, Entry>();
  // Hardcover first, so its links and ratings win over Goodreads.
  for (const source of [hardcover, goodreads]) {
    for (const status of ["read", "currentlyReading", "toRead"] as const) {
      for (const book of source[status]) {
        const key = bookKey(book);
        const existing = entries.get(key);
        if (!existing) {
          entries.set(key, { book: { ...book }, status });
          continue;
        }
        const merged = existing.book;
        merged.rating ||= book.rating;
        merged.cover ||= book.cover;
        merged.readAt ||= book.readAt;
        merged.addedAt ||= book.addedAt;
        if (RANK[status] > RANK[existing.status]) existing.status = status;
      }
    }
  }

  const shelves: Record<Status, SourceBook[]> = { read: [], currentlyReading: [], toRead: [] };
  for (const { book, status } of entries.values()) shelves[status].push(book);

  // Newest first; books without dates keep their snapshot order at the end.
  const newest = (key: "readAt" | "addedAt") => (a: SourceBook, b: SourceBook) =>
    (b[key] || b.addedAt || 0) - (a[key] || a.addedAt || 0);
  shelves.read.sort(newest("readAt"));
  shelves.currentlyReading.sort(newest("addedAt"));
  shelves.toRead.sort(newest("addedAt"));
  return shelves;
}

const strip = ({ title, author, cover, url, rating }: SourceBook): Book => ({ title, author, cover, url, rating });

const merged = merge();

export const shelves: {
  counts: { read: number; toRead: number };
  currentlyReading: Book[];
  read: Book[];
  toRead: Book[];
} = {
  counts: {
    read: merged.read.length,
    // The To read section also lists currently-reading books.
    toRead: merged.toRead.length + merged.currentlyReading.length,
  },
  currentlyReading: merged.currentlyReading.map(strip),
  read: merged.read.map(strip),
  toRead: merged.toRead.map(strip),
};
