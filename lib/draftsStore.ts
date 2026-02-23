import type { EmailDraft } from "./emailDrafts";

const KEY = "lfp_admin_email_drafts_v1";

export function loadDrafts(): EmailDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EmailDraft[]) : [];
  } catch {
    return [];
  }
}

export function saveDrafts(drafts: EmailDraft[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(drafts));
}

export function upsertDraft(next: EmailDraft) {
  const drafts = loadDrafts();
  const idx = drafts.findIndex((d) => d.id === next.id);
  const updated = idx >= 0 ? drafts.map((d) => (d.id === next.id ? next : d)) : [next, ...drafts];
  saveDrafts(updated);
  return updated;
}

export function deleteDraft(id: string) {
  const drafts = loadDrafts().filter((d) => d.id !== id);
  saveDrafts(drafts);
  return drafts;
}