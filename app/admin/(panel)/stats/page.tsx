"use client";

import AdminCrumbBar from "@/components/AdminCrumbBar";
import { useEffect, useMemo, useState } from "react";
import type { StatWeek } from "@/lib/stats";
import { defaultWeek } from "@/lib/stats";
import { loadWeeks, saveWeeks } from "@/lib/statsStore";

function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export default function AdminStatsPage() {
  const [weeks, setWeeks] = useState<StatWeek[]>([]);
  const [form, setForm] = useState<StatWeek>(defaultWeek());

  useEffect(() => {
    const loaded = loadWeeks().sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setWeeks(loaded);
  }, []);

  const latest = weeks[0] ?? null;
  const prev = weeks[1] ?? null;

  const deltas = useMemo(() => {
    if (!latest || !prev) return null;
    return {
      etsyVisits: latest.etsyVisits - prev.etsyVisits,
      etsyOrders: latest.etsyOrders - prev.etsyOrders,
      etsyRevenue: latest.etsyRevenue - prev.etsyRevenue,
      amazonRoyalties: latest.amazonRoyalties - prev.amazonRoyalties,
      kdpPagesRead: latest.kdpPagesRead - prev.kdpPagesRead,
      igFollowers: latest.igFollowers - prev.igFollowers,
      igReach: latest.igReach - prev.igReach,
      igSaves: latest.igSaves - prev.igSaves,
      fbFollowers: latest.fbFollowers - prev.fbFollowers,
      fbReach: latest.fbReach - prev.fbReach,
    };
  }, [latest, prev]);

  function addWeek() {
    const next = [form, ...weeks].sort((a, b) => (a.weekOf < b.weekOf ? 1 : -1));
    setWeeks(next);
    saveWeeks(next);
    setForm(defaultWeek());
  }

  return (
    <>
      <AdminCrumbBar title="Stats Panel" />

      <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Stats Panel</div>
        <div style={{ opacity: 0.8 }}>
          Manual entry now. Same fields later for automation. Weekly deltas included.
        </div>
      </div>

      {/* SNAPSHOT */}
      <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>Latest Snapshot</div>

        {!latest ? (
          <div style={{ opacity: 0.8 }}>No stats yet. Add your first week below.</div>
        ) : (
          <div className="grid4" style={{ gap: 12 }}>
            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>Etsy Visits</div>
              <div style={{ fontSize: 22 }}>{latest.etsyVisits}</div>
              {deltas && <div style={{ opacity: 0.7 }}>Δ {deltas.etsyVisits}</div>}
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>Etsy Orders</div>
              <div style={{ fontSize: 22 }}>{latest.etsyOrders}</div>
              {deltas && <div style={{ opacity: 0.7 }}>Δ {deltas.etsyOrders}</div>}
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>Etsy Revenue</div>
              <div style={{ fontSize: 22 }}>${latest.etsyRevenue.toFixed(2)}</div>
              {deltas && (
                <div style={{ opacity: 0.7 }}>Δ ${deltas.etsyRevenue.toFixed(2)}</div>
              )}
            </div>

            <div className="card" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700 }}>IG Followers</div>
              <div style={{ fontSize: 22 }}>{latest.igFollowers}</div>
              {deltas && <div style={{ opacity: 0.7 }}>Δ {deltas.igFollowers}</div>}
            </div>
          </div>
        )}
      </div>

      {/* ENTRY FORM */}
      <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>Add Weekly Stats</div>

        <div className="grid4" style={{ gap: 12 }}>
          <input
            className="input"
            value={form.weekOf}
            onChange={(e) => setForm({ ...form, weekOf: e.target.value })}
          />

          <input
            className="input"
            placeholder="Etsy Visits"
            value={form.etsyVisits}
            onChange={(e) => setForm({ ...form, etsyVisits: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="Etsy Orders"
            value={form.etsyOrders}
            onChange={(e) => setForm({ ...form, etsyOrders: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="Etsy Revenue"
            value={form.etsyRevenue}
            onChange={(e) => setForm({ ...form, etsyRevenue: num(e.target.value) })}
          />
        </div>

        <div className="grid4" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Amazon Royalties"
            value={form.amazonRoyalties}
            onChange={(e) => setForm({ ...form, amazonRoyalties: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="KDP Pages Read"
            value={form.kdpPagesRead}
            onChange={(e) => setForm({ ...form, kdpPagesRead: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="IG Reach"
            value={form.igReach}
            onChange={(e) => setForm({ ...form, igReach: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="IG Saves"
            value={form.igSaves}
            onChange={(e) => setForm({ ...form, igSaves: num(e.target.value) })}
          />
        </div>

        <div className="grid4" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="FB Followers"
            value={form.fbFollowers}
            onChange={(e) => setForm({ ...form, fbFollowers: num(e.target.value) })}
          />

          <input
            className="input"
            placeholder="FB Reach"
            value={form.fbReach}
            onChange={(e) => setForm({ ...form, fbReach: num(e.target.value) })}
          />

          <div />
          <button className="btn" onClick={addWeek}>
            Save Week
          </button>
        </div>
      </div>

      {/* HISTORY */}
      <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
        <div style={{ fontWeight: 700 }}>History</div>
        {weeks.length === 0 ? (
          <div style={{ opacity: 0.8 }}>No entries yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {weeks.map((w) => (
              <div
                key={w.weekOf}
                className="card"
                style={{
                  padding: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ fontWeight: 700 }}>{w.weekOf}</div>
                <div style={{ opacity: 0.8 }}>
                  Etsy: {w.etsyVisits} visits, {w.etsyOrders} orders, $
                  {w.etsyRevenue.toFixed(2)} • IG: {w.igFollowers} followers
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}