// Checks every service in status-services.json once a minute and serves the
// results, with 90 days of daily up/total counts per service, at /status.json.
// The /status page on the portfolio reads it. State is persisted to
// $DATA_DIR/status.json so history survives restarts and redeploys.
import { createServer } from "node:http";
import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const HISTORY_DAYS = 90;
const TIMEOUT_MS = 10_000;
const INTERVAL_MS = 60_000;
const PORT = Number(process.env.PORT ?? 3000);
const DATA_DIR = process.env.DATA_DIR ?? "./data";
const DATA_FILE = `${DATA_DIR}/status.json`;

// In the image the list sits next to this file; in the repo it's under src/data.
const listPath = ["./status-services.json", "../src/data/status-services.json"]
  .map((path) => new URL(path, import.meta.url))
  .find((url) => existsSync(url));
const groups = JSON.parse(await readFile(listPath, "utf8"));
const urls = groups.flatMap((group) => group.services.map((service) => service.url));

let state = { updatedAt: null, services: {} };
try {
  state = JSON.parse(await readFile(DATA_FILE, "utf8"));
} catch {
  // First run: start with an empty history.
}

// Any HTTP answer below 500 counts as up (e.g. the MCP server answers 401).
async function check(url) {
  const start = performance.now();
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS) });
    await res.body?.cancel();
    return { up: res.status < 500, code: res.status, ms: Math.round(performance.now() - start) };
  } catch {
    return { up: false, code: null, ms: null };
  }
}

// Retry once so a single dropped connection doesn't count as an outage.
async function checkWithRetry(url) {
  const first = await check(url);
  return first.up ? first : check(url);
}

async function runChecks() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const results = await Promise.all(urls.map(checkWithRetry));

  const services = {};
  urls.forEach((url, i) => {
    const result = results[i];
    const previousDays = state.services[url]?.days ?? [];
    const todayEntry = previousDays.find((day) => day.date === today) ?? { date: today, up: 0, total: 0 };
    const days = previousDays.filter((day) => day.date !== today);
    days.push({ date: today, up: todayEntry.up + (result.up ? 1 : 0), total: todayEntry.total + 1 });
    services[url] = { ...result, days: days.slice(-HISTORY_DAYS) };
    if (!result.up) console.log(`DOWN ${result.code ?? "---"} ${url}`);
  });

  state = { updatedAt: now.toISOString(), services };
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(`${DATA_FILE}.tmp`, JSON.stringify(state));
  await rename(`${DATA_FILE}.tmp`, DATA_FILE);
}

async function loop() {
  try {
    await runChecks();
  } catch (error) {
    console.error("Check run failed:", error);
  }
  setTimeout(loop, INTERVAL_MS);
}

createServer((req, res) => {
  const path = new URL(req.url ?? "/", "http://localhost").pathname;
  if (path === "/status.json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify(state));
  } else if (path === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(PORT, () => console.log(`Status monitor listening on :${PORT}, checking ${urls.length} services`));

loop();
