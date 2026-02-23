import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const ONLINE_KEY = "lfp:online";
const PV_PREFIX = "lfp:pv:";
const UV_PREFIX = "lfp:uv:";

function isoDay(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

async function redisPipeline(cmds: any[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
  }

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
  const now = Date.now();
  const cutoff = now - 60_000;
  const day = isoDay();

  // cleanup + read stats
  const results = await redisPipeline([
    ["ZREMRANGEBYSCORE", ONLINE_KEY, 0, cutoff],
    ["ZCARD", ONLINE_KEY],
    ["GET", `${PV_PREFIX}${day}`],
    ["PFCOUNT", `${UV_PREFIX}${day}`],
  ]);

  // pipeline responses come back as [{result:...}, ...]
  const online = Number(results?.[1]?.result ?? 0);
  const pageviews = Number(results?.[2]?.result ?? 0);
  const uniques = Number(results?.[3]?.result ?? 0);

  const res = NextResponse.json(
    { online, pageviews, uniques, windowSeconds: 60, day },
    { status: 200 }
  );
  res.headers.set("Cache-Control", "no-store");
  return res;
}