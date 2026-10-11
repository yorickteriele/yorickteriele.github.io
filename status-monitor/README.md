# Status monitor

Checks every service in `src/data/status-services.json` once a minute and serves
the result, with 90 days of daily up/total counts per service, at
`GET /status.json` (CORS enabled). The `/status` page on the portfolio reads it.

Runs on the personal Dokploy (`status.yorickteriele.nl`), built from this repo
with `status-monitor/Dockerfile` and a volume mounted at `/data`.

Run locally: `DATA_DIR=/tmp/status node status-monitor/server.mjs`
