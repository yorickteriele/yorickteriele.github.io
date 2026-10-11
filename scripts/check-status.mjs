// Checks every service in src/data/status-services.json and folds the result
// into a status file with 90 days of daily up/total counts per service.
// Run by .github/workflows/status.yml every 5 minutes; the file lives on the
// `status-data` branch and is read by the /status page.
//
// Usage: node scripts/check-status.mjs <path/to/status.json>
import { readFile, writeFile } from "node:fs/promises";

const HISTORY_DAYS = 90;
const TIMEOUT_MS = 10_000;

const file = process.argv[2];
if (!file) throw new Error("Usage: check-status.mjs <status.json>");

const groups = JSON.parse(await readFile(new URL("../src/data/status-services.json", import.meta.url), "utf8"));
const urls = groups.flatMap((group) => group.services.map((service) => service.url));

let previous = { services: {} };
try {
  previous = JSON.parse(await readFile(file, "utf8"));
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

const now = new Date();
const today = now.toISOString().slice(0, 10);
const results = await Promise.all(urls.map(checkWithRetry));

const services = {};
urls.forEach((url, i) => {
  const result = results[i];
  const days = (previous.services[url]?.days ?? []).filter((day) => day.date !== today);
  const todayEntry = previous.services[url]?.days?.find((day) => day.date === today) ?? { date: today, up: 0, total: 0 };
  days.push({ date: today, up: todayEntry.up + (result.up ? 1 : 0), total: todayEntry.total + 1 });
  services[url] = { ...result, days: days.slice(-HISTORY_DAYS) };
  console.log(`${result.up ? "up  " : "DOWN"} ${result.code ?? "---"} ${url}`);
});

await writeFile(file, JSON.stringify({ updatedAt: now.toISOString(), services }) + "\n");
