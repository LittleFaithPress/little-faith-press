"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrafficTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // fire-and-forget, don’t block UI
    fetch("/api/traffic/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      cache: "no-store",
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}