// Writes the Goodreads shelves to src/data/goodreads.json so the site can
// render them as static content instead of loading Goodreads in the browser.
// Runs before every build (including the nightly scheduled deploy).
// On any failure the existing file is kept so the build never breaks.
import { writeFile } from "node:fs/promises";

const USER_ID = "192543272";
const OUTPUT = new URL("../src/data/goodreads.json", import.meta.url);
const MAX_PAGES = 50;

function decode(text) {
  return text
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .trim();
}

function field(item, name) {
  const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return match ? decode(match[1].trim()) : "";
}

function time(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

async function fetchShelf(shelf) {
  const books = new Map();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(
      `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}&page=${page}`,
      { headers: { "User-Agent": "Mozilla/5.0 (portfolio build)" } },
    );
    if (!res.ok) throw new Error(`${shelf} page ${page}: HTTP ${res.status}`);
    const xml = await res.text();
    const before = books.size;
    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const id = field(item, "book_id");
      if (!id || books.has(id)) continue;
      books.set(id, {
        title: field(item, "title"),
        author: field(item, "author_name"),
        // Goodreads serves "_SY75_"-style thumbnails; dropping the suffix gives the full cover.
        cover: (field(item, "book_large_image_url") || field(item, "book_image_url"))
          .replace(/\._S[XY]\d+_(?=\.\w+$)/, ""),
        url: field(item, "link").split("?")[0],
        rating: Number(field(item, "user_rating")) || 0,
        readAt: time(field(item, "user_read_at")),
        addedAt: time(field(item, "user_date_added")),
      });
    }
    if (books.size === before) break;
  }
  return [...books.values()];
}

const strip = ({ readAt, addedAt, ...book }) => book;
const newest = (key) => (a, b) => (b[key] || b.addedAt) - (a[key] || a.addedAt);

try {
  const [read, toRead, currentlyReading] = await Promise.all(
    ["read", "to-read", "currently-reading"].map(fetchShelf),
  );
  const currentUrls = new Set(currentlyReading.map((book) => book.url));
  const data = {
    counts: {
      read: read.length,
      // The To read section also lists currently-reading books, each once.
      toRead: currentlyReading.length + toRead.filter((book) => !currentUrls.has(book.url)).length,
    },
    currentlyReading: currentlyReading.sort(newest("addedAt")).map(strip),
    read: read.sort(newest("readAt")).map(strip),
    toRead: toRead.sort(newest("addedAt")).map(strip),
  };
  await writeFile(OUTPUT, JSON.stringify(data, null, 2) + "\n");
  console.log("Goodreads shelves:", data.counts, `currently reading: ${currentlyReading.length}`);
} catch (error) {
  console.warn("Could not fetch Goodreads shelves, keeping existing file:", error.message);
}
