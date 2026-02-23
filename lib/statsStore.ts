import type { StatWeek } from "./stats";

const KEY = "lfp_admin_stats_weeks_v1";

export function loadWeeks(): StatWeek[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StatWeek[]) : [];
  } catch {
    return [];
  }
}

export function saveWeeks(weeks: StatWeek[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(weeks));
}