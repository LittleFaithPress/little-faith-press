import type { MetadataRoute } from "next";
import { books } from "@/lib/books";
import { freebies } from "@/lib/freebies";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* -----------------------------
     Static Pages
  ----------------------------- */
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/books",
    "/freebies",
    "/about",
    "/testimonials",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  /* -----------------------------
     Book Pages
  ----------------------------- */
  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${SITE_URL}/books/${book.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  /* -----------------------------
     Freebie Pages
  ----------------------------- */
  const freebiePages: MetadataRoute.Sitemap = freebies.map((freebie) => ({
    url: `${SITE_URL}/freebies/${freebie.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...bookPages, ...freebiePages];
}