"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, RefreshCw } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { statusGroups } from "@/data/status-services";

type State = { status: "checking" } | { status: "up"; ms: number } | { status: "down" };

const TIMEOUT_MS = 8000;
const INTERVAL_MS = 60_000;

// The site is a static export, so checks run in the visitor's browser. The
// services don't send CORS headers, so a no-cors request is used: it resolves
// whenever the server answers at all and rejects on DNS, TLS or network failure.
async function ping(url: string): Promise<State> {
  const start = performance.now();
  try {
    await fetch(url, { mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
    return { status: "up", ms: Math.round(performance.now() - start) };
  } catch {
    return { status: "down" };
  }
}

const allUrls = statusGroups.flatMap((group) => group.services.map((service) => service.url));

function Dot({ state }: { state: State }) {
  const color =
    state.status === "up" ? "bg-emerald-400" : state.status === "down" ? "bg-red-400" : "bg-foreground/40 animate-pulse";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />;
}

export default function StatusPage() {
  const { t, locale } = useLanguage();
  const [states, setStates] = useState<Record<string, State>>({});
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  const check = useCallback(async () => {
    setStates(Object.fromEntries(allUrls.map((url) => [url, { status: "checking" }])));
    const results = await Promise.all(allUrls.map(async (url) => [url, await ping(url)] as const));
    setStates(Object.fromEntries(results));
    setCheckedAt(new Date());
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, INTERVAL_MS);
    return () => clearInterval(id);
  }, [check]);

  const values = allUrls.map((url) => states[url] ?? { status: "checking" as const });
  const checking = values.some((state) => state.status === "checking");
  const down = values.filter((state) => state.status === "down").length;

  return (
    <div className="pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.status.backHome}
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t.status.title}</h1>
            <p className="text-xl text-foreground/80 leading-relaxed">{t.status.description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border rounded-lg px-6 py-4 mb-8">
            <div className="flex items-center gap-3 font-semibold text-foreground">
              <Dot state={checking ? { status: "checking" } : down > 0 ? { status: "down" } : { status: "up", ms: 0 }} />
              {checking
                ? t.status.checking
                : down > 0
                  ? t.status.someDown.replace("{count}", String(down)).replace("{total}", String(allUrls.length))
                  : t.status.allUp}
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground/70">
              {checkedAt && (
                <span>
                  {t.status.lastChecked} {checkedAt.toLocaleTimeString(locale)}
                </span>
              )}
              <button
                onClick={check}
                disabled={checking}
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
                {t.status.recheck}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {statusGroups.map((group) => (
              <section key={group.project} className="bg-card border border-border rounded-lg overflow-hidden">
                <h2 className="px-6 py-4 text-lg font-semibold text-foreground border-b border-border">
                  {group.project}
                </h2>
                <ul className="divide-y divide-border">
                  {group.services.map((service) => {
                    const state = states[service.url] ?? { status: "checking" };
                    return (
                      <li key={service.url} className="flex items-center justify-between gap-4 px-6 py-3">
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 min-w-0 text-foreground/90 hover:text-primary transition-colors"
                        >
                          <span className="truncate">{service.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <span className="inline-flex items-center gap-2 shrink-0 text-sm text-foreground/70">
                          {state.status === "up" && <span className="tabular-nums">{state.ms} ms</span>}
                          {t.status[state.status]}
                          <Dot state={state} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
