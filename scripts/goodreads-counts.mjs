// Writes the full Goodreads shelf totals to src/data/goodreads-counts.json.
// The in-browser widget only returns a limited number of books, so the
// totals are fetched at build time from the paginated shelf RSS feeds.
// On any failure the existing file is kept so the build never breaks.
import { writeFile } from "node:fs/promises";

const USER_ID = "192543272";
const OUTPUT = new URL("../src/data/goodreads-counts.json", import.meta.url);
const MAX_PAGES = 50;

async function shelfBookIds(shelf) {
  const ids = new Set();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(
      `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}&page=${page}`,
      { headers: { "User-Agent": "Mozilla/5.0 (portfolio build)" } },
    );
    if (!res.ok) throw new Error(`${shelf} page ${page}: HTTP ${res.status}`);
    const xml = await res.text();
    const before = ids.size;
    for (const [, id] of xml.matchAll(/<book_id>\s*(\d+)\s*<\/book_id>/g)) ids.add(id);
    if (ids.size === before) break;
  }
  return ids;
}

try {
  const [read, toRead, current] = await Promise.all(
    ["read", "to-read", "currently-reading"].map(shelfBookIds),
  );
  // The To read section also lists currently-reading books, each once.
  const counts = { read: read.size, toRead: new Set([...toRead, ...current]).size };
  await writeFile(OUTPUT, JSON.stringify(counts, null, 2) + "\n");
  console.log("Goodreads shelf counts:", counts);
} catch (error) {
  console.warn("Could not fetch Goodreads shelf counts, keeping existing file:", error.message);
}
