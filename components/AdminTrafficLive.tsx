"use client";

import { useEffect, useState } from "react";

type Stats = {
  online: number;
  pageviews: number;
  uniques: number;
  windowSeconds: number;
  day: string;
};

export default function AdminTrafficLive() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);

      const res = await fetch("/api/admin/traffic", { cache: "no-store" });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = (await res.json()) as Stats;
      setStats(json ?? null);
    } catch (e: any) {
      setErr(e?.message ? `Traffic API error: ${e.message}` : "Could not load traffic stats.");
    }
  }

  useEffect(() => {
    load(); // ✅ fetch immediately on mount
    const t = setInterval(load, 5000); // refresh every 5s
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "baseline",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700 }}>Live Traffic</div>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>refreshes every 5s</div>
      </div>

      {err ? (
        <div style={{ color: "var(--muted)" }}>{err}</div>
      ) : !stats ? (
        <div style={{ color: "var(--muted)" }}>Loading…</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Online now</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{stats.online}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                last {stats.windowSeconds}s
              </div>
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Page views today</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{stats.pageviews}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{stats.day}</div>
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Unique visitors today</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{stats.uniques}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{stats.day}</div>
            </div>
          </div>

          <button className="pill" style={{ width: "fit-content" }} onClick={load}>
            Refresh now
          </button>
        </div>
      )}
    </div>
  );
}