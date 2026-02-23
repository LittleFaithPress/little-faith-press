import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/books";

export default function BookCard({ book }: { book: Book }) {

  // ✅ Remove duplicated "Series: " prefix safely
  const displayTitle = book.title.startsWith(`${book.series}: `)
    ? book.title.replace(`${book.series}: `, "")
    : book.title;

  const CardContent = (
    <div className="card" style={{ padding: 18, display: "grid", gap: 16 }}>
      {/* BOOK IMAGE */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid var(--stroke)",
          background: "rgba(24,47,92,.05)",
        }}
      >
        <Image
          src={book.image}
          alt={book.title}
          width={800}
          height={500}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ display: "grid", gap: 8 }}>
        {/* ✅ CLEAN TITLE */}
        <div style={{ fontSize: 20 }}>
          <strong>{displayTitle}</strong>
        </div>

        {/* ✅ SERIES LABEL (new, lightweight) */}
        <div
          style={{
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          {book.series}
        </div>

        {/* TAGLINE */}
        <div
          style={{
            fontSize: 16,
            color: "var(--muted)",
            lineHeight: 1.4,
          }}
        >
          {book.tagline}
        </div>
      </div>

      {/* CTA Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 6,
        }}
      >
        <span
          className="pill"
          style={{
            fontSize: 15,
            padding: "8px 14px",
            borderColor: "rgba(24,47,92,.25)",
          }}
        >
          View Book
        </span>
      </div>
    </div>
  );

  // ✅ Internal routing unchanged
  return (
    <Link href={`/books/${book.id}`} style={{ textDecoration: "none" }}>
      {CardContent}
    </Link>
  );
}