import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const ONLINE_KEY = "lfp:online"; // sorted set
const PV_PREFIX = "lfp:pv:"; // string counter per day
const UV_PREFIX = "lfp:uv:"; // hyperloglog per day

function isoDay(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
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

export async function POST(req: Request) {
  const now = Date.now();
  const day = isoDay();

  // read existing visitor id from cookie (or create it)
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)lfp_vid=([^;]+)/);
  let vid = match?.[1];

  if (!vid) {
    // Edge runtime supports crypto.randomUUID()
    vid = crypto.randomUUID();
  }

  const cutoff = now - 60_000; // 60 seconds "online" window

  // Track:
  // - online visitors in a ZSET scored by last-seen timestamp
  // - today pageviews counter
  // - today unique visitors via HyperLogLog
  await redisPipeline([
    ["ZADD", ONLINE_KEY, now, vid],
    ["ZREMRANGEBYSCORE", ONLINE_KEY, 0, cutoff],
    ["INCR", `${PV_PREFIX}${day}`],
    ["PFADD", `${UV_PREFIX}${day}`, vid],
  ]);

  const res = NextResponse.json({ ok: true }, { status: 200 });

  // set cookie if it wasn’t already present
  if (!match) {
    res.cookies.set("lfp_vid", vid, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  // avoid any caching
  res.headers.set("Cache-Control", "no-store");
  return res;
}