"use client";

import { useEffect, useMemo, useState } from "react";
import { loadWeeks } from "@/lib/statsStore";
import type { StatWeek } from "@/lib/stats";

function money(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `$${n.toFixed(2)}`;
}

export default function AdminWidgetCounters() {
  const [weeks, setWeeks] = useState<StatWeek[]>([]);

  useEffect(() => {
    const loaded = loadWeeks().sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setWeeks(loaded);
  }, []);

  const latest = useMemo(() => weeks[0] ?? null, [weeks]);

  // If no stats yet, show placeholders exactly like your current UI.
  if (!latest) {
    return (
      <>
        <span className="pill">Visits: —</span>
        <span className="pill">Subscribers: —</span>
      </>
    );
  }

  // We expose values via data attributes so we can render different pill sets
  // depending on which widget card uses this component (see Step 2).
  return (
    <span
      style={{ display: "contents" }}
      data-weekof={latest.weekOf}
      data-etsyvisits={latest.etsyVisits}
      data-etsyrevenue={latest.etsyRevenue}
      data-amazonroyalties={latest.amazonRoyalties}
      data-igfollowers={latest.igFollowers}
      data-fbfollowers={latest.fbFollowers}
    />
  );
}

/**
 * Helper components (kept in same file to keep it simple).
 * Each one reads the latest stats once and renders the appropriate pills.
 */

export function TrafficSubscriberPills() {
  const [latest, setLatest] = useState<StatWeek | null>(null);

  useEffect(() => {
    const loaded = loadWeeks().sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setLatest(loaded[0] ?? null);
  }, []);

  return (
    <>
      <span className="pill">Visits: {latest ? latest.etsyVisits : "—"}</span>
      <span className="pill">Subscribers: —</span>
    </>
  );
}

export function StoreSnapshotPills() {
  const [latest, setLatest] = useState<StatWeek | null>(null);

  useEffect(() => {
    const loaded = loadWeeks().sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setLatest(loaded[0] ?? null);
  }, []);

  return (
    <>
      <span className="pill">
        Amazon: {latest ? money(latest.amazonRoyalties) : "—"}
      </span>
      <span className="pill">
        Etsy: {latest ? money(latest.etsyRevenue) : "—"}
      </span>
    </>
  );
}

export function SocialSnapshotPills() {
  const [latest, setLatest] = useState<StatWeek | null>(null);

  useEffect(() => {
    const loaded = loadWeeks().sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setLatest(loaded[0] ?? null);
  }, []);

  return (
    <>
      <span className="pill">IG: {latest ? latest.igFollowers : "—"}</span>
      <span className="pill">FB: {latest ? latest.fbFollowers : "—"}</span>
      <span className="pill">Pinterest: —</span>
    </>
  );
}