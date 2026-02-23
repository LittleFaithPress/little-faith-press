"use client";

import { useEffect } from "react";

export default function TrafficPing() {
  useEffect(() => {
    const ping = () => {
      fetch("/api/traffic/hit", { method: "POST" }).catch(() => {});
    };

    ping();
    const t = setInterval(ping, 5000);

    return () => clearInterval(t);
  }, []);

  return null;
}