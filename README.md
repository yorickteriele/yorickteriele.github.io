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

The Reading section is built from `src/data/goodreads.json`, which `scripts/goodreads.mjs` refreshes from the Goodreads RSS feeds on every deploy, including the nightly one. Run `node scripts/goodreads.mjs` to refresh it locally.

## Deployment

`.github/workflows/nextjs.yml` builds and deploys to GitHub Pages on every push to `main` and daily at 04:00 UTC.
