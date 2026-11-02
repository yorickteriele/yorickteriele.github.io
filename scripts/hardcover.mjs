// Writes the Hardcover shelves to src/data/hardcover.json. The site merges
// them with the Goodreads shelves (see src/lib/books.ts).
// Needs HARDCOVER_TOKEN: the API token from https://hardcover.app/account/api.
// Without a token, or on any failure, the existing file is kept so the build
// never breaks.
import { writeFile } from "node:fs/promises";

const OUTPUT = new URL("../src/data/hardcover.json", import.meta.url);
const PAGE = 100;
const STATUS = { toRead: 1, currentlyReading: 2, read: 3 };

const QUERY = `query Shelf($status: Int!, $limit: Int!, $offset: Int!) {
  me {
    username
    user_books(
      where: { status_id: { _eq: $status } }
      order_by: [{ last_read_date: desc_nulls_last }, { date_added: desc }]
      limit: $limit
      offset: $offset
    ) {
      rating
      last_read_date
      first_read_date
      date_added
      edition { image { url } }
      book { slug title cached_contributors cached_image }
    }
  }
}`;

function time(value) {
  const parsed = Date.parse(value ?? "");
  return Number.isNaN(parsed) ? 0 : parsed;
}

async function request(token, variables) {
  const res = await fetch("https://api.hardcover.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      "User-Agent": "yorickteriele.github.io build",
    },
    body: JSON.stringify({ query: QUERY, variables }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || out.errors) {
    throw new Error(`HTTP ${res.status}: ${out.errors?.[0]?.message ?? out.error ?? res.statusText}`);
  }
  return out.data.me[0];
}

async function fetchShelf(token, status) {
  const books = [];
  let username = "";
  for (let offset = 0; offset < 5000; offset += PAGE) {
    const me = await request(token, { status, limit: PAGE, offset });
    username = me?.username ?? username;
    const batch = me?.user_books ?? [];
    for (const entry of batch) {
      const { book } = entry;
      const contributors = book.cached_contributors ?? [];
      const authors = contributors.filter((c) => !c.contribution || c.contribution === "Author");
      books.push({
        title: book.title,
        author: (authors.length ? authors : contributors).map((c) => c.author?.name).filter(Boolean).join(", "),
        cover: entry.edition?.image?.url ?? book.cached_image?.url ?? "",
        url: `https://hardcover.app/books/${book.slug}`,
        // Hardcover allows half stars; the site shows whole ones.
        rating: Math.round(entry.rating ?? 0),
        readAt: time(entry.last_read_date ?? entry.first_read_date),
        addedAt: time(entry.date_added),
      });
    }
    if (batch.length < PAGE) break;
  }
  return { username, books };
}

const token = process.env.HARDCOVER_TOKEN?.trim();
if (!token) {
  console.warn("::warning::HARDCOVER_TOKEN is not set, keeping existing Hardcover file.");
} else {
  try {
    const [toRead, currentlyReading, read] = await Promise.all(
      [STATUS.toRead, STATUS.currentlyReading, STATUS.read].map((status) => fetchShelf(token, status)),
    );
    const data = {
      username: read.username || toRead.username || currentlyReading.username,
      currentlyReading: currentlyReading.books,
      read: read.books,
      toRead: toRead.books,
    };
    await writeFile(OUTPUT, JSON.stringify(data, null, 2) + "\n");
    console.log("Hardcover shelves:", {
      read: data.read.length,
      toRead: data.toRead.length,
      currentlyReading: data.currentlyReading.length,
    });
  } catch (error) {
    console.warn("::warning::Could not fetch Hardcover shelves, keeping existing file:", error.message);
  }
}
