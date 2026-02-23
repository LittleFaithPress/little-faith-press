"use client";

import { useEffect, useState } from "react";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("ok");
    setFirstName("");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 16, color: "var(--gold)" }}>
          First name (optional)
        </label>
        <input
          suppressHydrationWarning
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="Your Name"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 16, color: "var(--gold)" }}>
          Email
        </label>
        <input
          suppressHydrationWarning
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="your@email.com"
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Get Free Activities & Updates
      </button>

      {status === "ok" ? (
        <div style={{ color: "var(--gold)", fontSize: 14 }}>
          You’re in. Welcome 🎉
        </div>
      ) : (
        <div style={{ color: "var(--gold)", fontSize: 14, lineHeight: 1.4 }}>
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