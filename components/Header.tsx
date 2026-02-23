"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Freebies", href: "/freebies" },
  { label: "Mailing List", href: "/#mailing-list" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ padding: "30px 0 8px" }}>
      <div className="container" style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
        {/* LEFT */}
        <Link href="/" style={{ display: "flex", gap: 12, alignItems: "flex-start", minWidth: 260 }}>
          <Image
            src="/logo.svg"
            alt="LittleFaithPressLogo.svg"
            width={84}
            height={84}
            style={{ marginTop: 2 }}
            priority
          />
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 30, letterSpacing: 0.2, lineHeight: 1 }}>
              <strong>Little Faith Press</strong>
            </div>
            <div className="brandSub">
              Books and printable activities for ages 3–6.
              <br />
              Faith stories, family read-alouds, and screen-free learning made simple.
            </div>
          </div>
        </Link>

        {/* RIGHT */}
        <div style={{ marginLeft: "auto" }}>
          {/* DESKTOP NAV (unchanged layout, just wrapped in a desktop-only container) */}
          <div className="navDesktop">
            <nav
              className="pill"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "10px 28px",
              }}
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "7px 0px",
                    borderRadius: 999,
                    fontSize: 19,
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* divider */}
              <span className="navDivider" />

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{ display: "inline-flex", padding: 0, borderRadius: 999 }}
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{ display: "inline-flex", padding: 0, borderRadius: 999 }}
              >
                <Facebook size={20} />
              </a>
            </nav>
          </div>

          {/* MOBILE NAV (never wraps) */}
          <div className="navMobile">
            <div className="pill navMobileBar">
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                className="navIconBtn"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="navDivider" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="navIconBtn"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="navIconBtn"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {open && (
              <div className="navMobilePanel">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="navMobileLink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}