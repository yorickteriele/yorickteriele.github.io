"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import statusGroups from "@/data/status-services.json";

// Written every 5 minutes by .github/workflows/status.yml.
const DATA_URL = "https://raw.githubusercontent.com/yorickteriele/yorickteriele.github.io/refs/heads/status-data/status.json";
const DAYS = 90;
const REFRESH_MS = 60_000;

interface Day {
  date: string;
  up: number;
  total: number;
}

interface ServiceStatus {
  up: boolean;
  code: number | null;
  ms: number | null;
  days: Day[];
}

interface StatusData {
  updatedAt: string;
  services: Record<string, ServiceStatus>;
}

const services = statusGroups.flatMap((group) =>
  group.services.map((service) => ({ ...service, project: group.project })),
);

// The last 90 calendar days (UTC, matching the checker), oldest first.
function lastDays() {
  const today = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  return Array.from({ length: DAYS }, (_, i) => new Date(today - (DAYS - 1 - i) * 86_400_000).toISOString().slice(0, 10));
}

function barColor(day: Day | undefined) {
  if (!day || day.total === 0) return "bg-foreground/15";
  const ratio = day.up / day.total;
  if (ratio === 1) return "bg-emerald-400/80";
  if (ratio >= 0.95) return "bg-amber-400";
  return "bg-red-400";
}

function formatUptime(days: Day[]) {
  const up = days.reduce((sum, day) => sum + day.up, 0);
  const total = days.reduce((sum, day) => sum + day.total, 0);
  if (total === 0) return null;
  const pct = (up / total) * 100;
  return pct === 100 ? "100" : pct.toFixed(2);
}

function ServiceCard({ name, project, status }: { name: string; project: string; status?: ServiceStatus }) {
  const { t, locale } = useLanguage();
  const byDate = new Map(status?.days.map((day) => [day.date, day]));
  const uptime = status ? formatUptime(status.days) : null;

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 className="font-semibold text-foreground truncate">
          {project}
          {name !== "Website" && <span className="font-normal text-foreground/70"> · {name}</span>}
        </h2>
        {status && (
          <span
            title={status.up ? t.status.up : t.status.down}
            className={`inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${status.up ? "bg-emerald-500" : "bg-red-500"}`}
          >
            {status.up ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : <X className="w-3 h-3 text-white" strokeWidth={3} />}
          </span>
        )}
      </div>

      <div className="flex gap-px h-8">
        {lastDays().map((date) => {
          const day = byDate.get(date);
          const label = new Date(date).toLocaleDateString(locale, { day: "numeric", month: "short" });
          return (
            <div
              key={date}
              title={day ? `${label}: ${((day.up / day.total) * 100).toFixed(2)}%` : `${label}: ${t.status.noData}`}
              className={`flex-1 rounded-[1px] ${barColor(day)}`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-2 text-xs text-foreground/60">
        <span className="shrink-0">{t.status.daysAgo}</span>
        <span className="flex-1 h-px bg-border" />
        <span className="shrink-0">{uptime ? `${uptime}% ${t.status.uptime}` : t.status.noData}</span>
        <span className="flex-1 h-px bg-border" />
        <span className="shrink-0">{t.status.today}</span>
      </div>
    </div>
  );
}

export default function StatusPage() {
  const { t, locale } = useLanguage();
  const [data, setData] = useState<StatusData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        setData(await res.json());
        setFailed(false);
      } catch {
        setFailed(true);
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const down = data ? services.filter((service) => data.services[service.url]?.up === false).length : 0;

  return (
    <div className="pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
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
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  !data ? "bg-foreground/40 animate-pulse" : down > 0 ? "bg-red-400" : "bg-emerald-400"
                }`}
              />
              {failed && !data
                ? t.status.unavailable
                : !data
                  ? t.status.loading
                  : down > 0
                    ? t.status.someDown.replace("{count}", String(down)).replace("{total}", String(services.length))
                    : t.status.allUp}
            </div>
            {data && (
              <span className="text-sm text-foreground/70">
                {t.status.lastChecked}{" "}
                {new Date(data.updatedAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {services.map((service) => (
              <ServiceCard
                key={service.url}
                name={service.name}
                project={service.project}
                status={data?.services[service.url]}
              />
            ))}
            {services.length % 2 === 1 && <div className="hidden md:block bg-card" />}
          </div>
        </div>
      </div>
    </div>
  );
}
