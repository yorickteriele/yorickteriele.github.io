import data from "@/data/goodreads.json";

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

export function shelfUrl(shelf: Shelf) {
  return `https://www.goodreads.com/review/list/${GOODREADS_USER_ID}-yorick-te-riele?shelf=${shelf}`;
}

// Shelves fetched at build time by scripts/goodreads.mjs (refreshed nightly).
export const shelves: {
  counts: { read: number; toRead: number };
  currentlyReading: Book[];
  read: Book[];
  toRead: Book[];
} = data;
