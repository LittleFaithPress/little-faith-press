"use client";

import { useEffect } from "react";

export default function TrafficPing() {
  useEffect(() => {
    fetch("/api/traffic/hit", {
      method: "POST",
      cache: "no-store",
    }).catch(() => {});
  }, []);

  return null;
}