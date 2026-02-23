"use client";

import AdminCrumbBar from "@/components/AdminCrumbBar";
import { useEffect, useMemo, useState } from "react";
import type { EmailDraft, DraftStatus, DraftType } from "@/lib/emailDrafts";
import { DRAFT_STATUSES, DRAFT_TYPES } from "@/lib/emailDrafts";
import { loadDrafts, upsertDraft, deleteDraft } from "@/lib/draftsStore";

function uid() {
  return (
    Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36)
  );
}

const emptyDraft = (): EmailDraft => ({
  id: uid(),
  title: "",
  type: "Welcome",
  status: "Idea",
  subject: "",
  body: "",
  updatedAt: new Date().toISOString(),
});

export default function EmailDraftsPage() {
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<DraftType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<DraftStatus | "All">("All");

  useEffect(() => {
    const loaded = loadDrafts();
    setDrafts(loaded);
    setActiveId(loaded[0]?.id ?? null);
  }, []);

  const active = useMemo(
    () => drafts.find((d) => d.id === activeId) ?? null,
    [drafts, activeId]
  );

  const filtered = useMemo(() => {
    return drafts
      .filter((d) => (typeFilter === "All" ? true : d.type === typeFilter))
      .filter((d) =>
        statusFilter === "All" ? true : d.status === statusFilter
      )
      .filter((d) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.subject.toLowerCase().includes(q) ||
          d.body.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [drafts, query, typeFilter, statusFilter]);

  function createNew() {
    const nd = emptyDraft();
    const next = [nd, ...drafts];
    setDrafts(next);
    setActiveId(nd.id);
    upsertDraft(nd);
  }

  function updateActive(patch: Partial<EmailDraft>) {
    if (!active) return;
    const updated: EmailDraft = {
      ...active,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    const next = drafts.map((d) => (d.id === updated.id ? updated : d));
    setDrafts(next);
    upsertDraft(updated);
  }

  function removeActive() {
    if (!active) return;
    const next = drafts.filter((d) => d.id !== active.id);
    setDrafts(next);
    deleteDraft(active.id);
    setActiveId(next[0]?.id ?? null);
  }

  function copyToClipboard() {
    if (!active) return;
    const text = `Subject: ${active.subject}\n\n${active.body}`;
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <AdminCrumbBar title="Email Drafts" />

      <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Email Drafts</div>
            <div style={{ opacity: 0.8 }}>
              Create, organize, and keep your copy ready to paste into Kit.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn" onClick={createNew}>
              + New Draft
            </button>
            <button className="btn" onClick={copyToClipboard} disabled={!active}>
              Copy
            </button>
            <button className="btn" onClick={removeActive} disabled={!active}>
              Delete
            </button>
          </div>
        </div>

        <div className="grid4" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Search drafts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="All">All Types</option>
            {DRAFT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="All">All Status</option>
            {DRAFT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", alignItems: "center", opacity: 0.8 }}>
            {filtered.length} draft{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
        {/* LEFT LIST */}
        <div
          className="card"
          style={{
            padding: 12,
            display: "grid",
            gap: 10,
            alignContent: "start",
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: 10, opacity: 0.8 }}>
              No drafts yet. Create your first one.
            </div>
          ) : (
            filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className="card"
                style={{
                  textAlign: "left",
                  padding: 12,
                  border:
                    d.id === activeId
                      ? "2px solid var(--stroke)"
                      : "1px solid var(--stroke)",
                  background:
                    d.id === activeId ? "rgba(24,47,92,.05)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 700 }}>
                  {d.title || "(Untitled Draft)"}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {d.type} • {d.status}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                  Updated {new Date(d.updatedAt).toLocaleString()}
                </div>
              </button>
            ))
          )}
        </div>

        {/* RIGHT EDITOR */}
        <div className="card" style={{ padding: 18, display: "grid", gap: 12 }}>
          {!active ? (
            <div style={{ opacity: 0.8 }}>Select a draft to edit.</div>
          ) : (
            <>
              <div className="grid4" style={{ gap: 12 }}>
                <input
                  className="input"
                  placeholder="Draft title (internal)"
                  value={active.title}
                  onChange={(e) => updateActive({ title: e.target.value })}
                />

                <select
                  className="input"
                  value={active.type}
                  onChange={(e) =>
                    updateActive({ type: e.target.value as DraftType })
                  }
                >
                  {DRAFT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  className="input"
                  value={active.status}
                  onChange={(e) =>
                    updateActive({ status: e.target.value as DraftStatus })
                  }
                >
                  {DRAFT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <div
                  style={{ display: "flex", alignItems: "center", opacity: 0.8 }}
                >
                  {active.id}
                </div>
              </div>

              <input
                className="input"
                placeholder="Email subject"
                value={active.subject}
                onChange={(e) => updateActive({ subject: e.target.value })}
              />

              <textarea
                className="input"
                placeholder="Write your email body here..."
                value={active.body}
                onChange={(e) => updateActive({ body: e.target.value })}
                style={{ minHeight: 320, resize: "vertical", padding: 12 }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}