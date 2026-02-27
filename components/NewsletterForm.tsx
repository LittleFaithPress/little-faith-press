"use client";

import { useEffect, useState } from "react";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, website }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      setStatus("error");
      setMsg(data?.message || "Something went wrong. Try again.");
      return;
    }

    setStatus("ok");

    // ✅ Your updated success message
    setMsg(
      data?.message ||
        "You're in! 🎉\n\nYour free printable is on its way to your inbox.\nPlease check your Promotions or Spam folder just in case."
    );

    setFirstName("");
    setEmail("");
    setWebsite("");
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 16, color: "var(--gold)" }}>
          First name (optional)
        </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="Your Name"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 16, color: "var(--gold)" }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="your@email.com"
          style={inputStyle}
        />
      </div>

      {/* Honeypot hidden field */}
      <div
        style={{
          position: "absolute",
          left: -10000,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>Website</label>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <button
        type="submit"
        style={buttonStyle}
        disabled={status === "loading"}
      >
        {status === "loading"
          ? "Submitting..."
          : "Get Free Activities & Updates"}
      </button>

      {status === "ok" ? (
        <div
          style={{
            color: "var(--gold)",
            fontSize: 14,
            lineHeight: 1.5,
            whiteSpace: "pre-line", // ✅ keeps your line breaks
          }}
        >
          {msg}
        </div>
      ) : status === "error" ? (
        <div style={{ color: "var(--gold)", fontSize: 14 }}>{msg}</div>
      ) : (
        <div
          style={{
            color: "var(--gold)",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          Get freebies, new releases, and calm screen-free activity ideas.
        </div>
      )}
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.22)",
  background: "rgba(255,255,255,.08)",
  color: "white",
  outline: "none",
  fontSize: 16,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.22)",
  background: "rgba(245,243,239,.92)",
  color: "var(--navy)",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};