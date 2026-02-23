import BookCard from "@/components/BookCard";
import { books } from "@/lib/books";

const SERIES_ORDER = [
  "Little Bible Stories",
  "Daddy & Me",
  "Pappa en Ek",
  "Seasonal Coloring Books",
] as const;

/* ✅ Series descriptions (presentation only) */
const SERIES_DESCRIPTIONS: Record<string, string> = {
  "Little Bible Stories":
    "Gentle Bible stories children can understand and enjoy.",
  "Daddy & Me":
    "Everyday adventures that help children feel confident in real-life moments.",
  "Pappa en Ek":
    "Afrikaans read-aloud stories celebrating everyday family moments.",
  "Seasonal Coloring Books":
    "Simple holiday activities designed for calm, screen-free fun.",
};

export default function BooksPage() {
  // Group books by series
  const grouped = books.reduce<Record<string, typeof books>>((acc, b) => {
    const key = b.series ?? "Other";
    (acc[key] ||= []).push(b);
    return acc;
  }, {});

  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        {/* Page header */}
        <div className="card" style={{ padding: 22 }}>
          <h1 className="h1">Books</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            Browse the Little Faith Press collection, built for ages 3–6 with
            calm visuals and toddler-friendly design.
          </p>
        </div>

        {/* Series sections */}
        <div style={{ display: "grid", gap: 26 }}>
          {SERIES_ORDER.filter(
            (name) => grouped[name]?.length
          ).map((seriesName) => (
            <section key={seriesName} style={{ display: "grid", gap: 12 }}>
              {/* ✅ Header + Description */}
              <div
                style={{
                  padding: "0 2px",
                  display: "grid",
                  gap: 6,
                }}
              >
                <h2 className="h2">{seriesName}</h2>

                {SERIES_DESCRIPTIONS[seriesName] && (
                  <p style={{ color: "var(--muted)" }}>
                    {SERIES_DESCRIPTIONS[seriesName]}
                  </p>
                )}
              </div>

              <div className="grid4">
                {grouped[seriesName].map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </section>
          ))}

          {/* Fallback for unmatched series */}
          {Object.keys(grouped)
            .filter((k) => !SERIES_ORDER.includes(k as any))
            .map((k) => (
              <section key={k} style={{ display: "grid", gap: 12 }}>
                <div
                  style={{
                    padding: "0 2px",
                    display: "grid",
                    gap: 6,
                  }}
                >
                  <h2 className="h2">{k}</h2>
                </div>

                <div className="grid4">
                  {grouped[k].map((b) => (
                    <BookCard key={b.id} book={b} />
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
    </main>
  );
}