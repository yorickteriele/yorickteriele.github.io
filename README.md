# yorickteriele.nl

Personal portfolio of Yorick te Riele, built with Next.js, React and Tailwind CSS and exported as a static site to GitHub Pages.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export to ./out
```

## Content

- Text and translations (English/Dutch): `src/locales/en.json`, `src/locales/nl.json`
- Experience: `src/locales/experience.json`
- Projects: `src/locales/projects.json` (`featured: true` shows a project as a large card)
- Images: `public/`

## Reading

The Reading section merges two snapshots, refreshed on every deploy (including the nightly one):

- `src/data/goodreads.json`, from the Goodreads RSS feeds via `node scripts/goodreads.mjs`.
- `src/data/hardcover.json`, from the Hardcover API via `HARDCOVER_TOKEN=... node scripts/hardcover.mjs`. In CI the token comes from the `HARDCOVER_TOKEN` repository secret (get it at https://hardcover.app/account/api).

Books on both sites are shown once (matched by title and author), and the furthest status wins. If a fetch fails, the last snapshot is kept and the run shows a warning.

## Deployment

`.github/workflows/nextjs.yml` builds and deploys to GitHub Pages on every push to `main` and daily at 04:00 UTC.
