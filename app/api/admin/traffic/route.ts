import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const ONLINE_KEY = "lfp:online";
const PV_PREFIX = "lfp:pv:";
const UV_PREFIX = "lfp:uv:";

function isoDay(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function getUpstash() {
  const urlRaw = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!urlRaw || !token) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  }

  // ✅ prevent https://.../ + /pipeline => //pipeline
  const url = urlRaw.replace(/\/+$/, "");
  return { url, token };
}

async function redisPipeline(cmds: any[]) {
  const { url, token } = getUpstash();

  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmds),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upstash pipeline failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function GET() {
  try {
    const now = Date.now();
    const cutoff = now - 60_000;
    const day = isoDay();

    const results = await redisPipeline([
      ["ZREMRANGEBYSCORE", ONLINE_KEY, 0, cutoff],
      ["ZCARD", ONLINE_KEY],
      ["GET", `${PV_PREFIX}${day}`],
      ["PFCOUNT", `${UV_PREFIX}${day}`],
    ]);

    const online = Number(results?.[1]?.result ?? 0);
    const pageviews = Number(results?.[2]?.result ?? 0);
    const uniques = Number(results?.[3]?.result ?? 0);

    const res = NextResponse.json(
      { online, pageviews, uniques, windowSeconds: 60, day },
      { status: 200 }
    );
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (err: any) {
    // ✅ Always return JSON (never HTML) so AdminTrafficLive won’t print a giant HTML page
    const res = NextResponse.json(
      {
        ok: false,
        error: err?.message || String(err),
        hasUrl: Boolean(process.env.UPSTASH_REDIS_REST_URL),
        hasToken: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
      },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}