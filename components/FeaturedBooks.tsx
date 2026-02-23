import BookCard from "@/components/BookCard";
import { books, BOOK_SERIES } from "@/lib/books";

export default function FeaturedBooks() {
  const featured = books.filter((b) => b.featured);

  // If no featured marked yet, keep your safe fallback behavior.
  if (featured.length === 0) {
    return (
      <section style={{ padding: "15px 0 60px" }}>
        <div className="container" style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 14,
            }}
          >
            <h2 className="h2">Start with these favorites</h2>
            <a href="/books" className="pill" style={{ fontSize: 16 }}>
              View All Books
            </a>
          </div>

          <div className="grid4">
            {books.slice(0, 4).map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ Desired mix: 2 Bible, 1 Daddy, 1 Seasonal
  const desired: { series: (typeof BOOK_SERIES)[number]; count: number }[] = [
    { series: "Little Bible Stories", count: 2 },
    { series: "Daddy & Me", count: 1 },
    { series: "Seasonal Coloring Books", count: 1 },
  ];

  const picked: typeof featured = [];
  const pickedIds = new Set<string>();

  // Helper: pick up to N from a series, skipping already picked
  function pickFromSeries(series: string, count: number) {
    for (const b of featured) {
      if (picked.length >= 4) break;
      if (pickedIds.has(b.id)) continue;
      if (b.series !== series) continue;
      picked.push(b);
      pickedIds.add(b.id);
      if (
        picked.filter((x) => x.series === series).length >= count
      ) {
        break;
      }
    }
  }

  // First pass: fulfill the desired mix
  for (const d of desired) pickFromSeries(d.series, d.count);

  // Second pass: fill remaining slots with any featured books
  for (const b of featured) {
    if (picked.length >= 4) break;
    if (pickedIds.has(b.id)) continue;
    picked.push(b);
    pickedIds.add(b.id);
  }

  // Final safety: if still short (rare), fill from all books
  if (picked.length < 4) {
    for (const b of books) {
      if (picked.length >= 4) break;
      if (pickedIds.has(b.id)) continue;
      picked.push(b);
      pickedIds.add(b.id);
    }
  }

  return (
    <section style={{ padding: "15px 0 60px" }}>
      <div className="container" style={{ display: "grid", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <h2 className="h2">Start with these favorites</h2>
          <a href="/books" className="pill" style={{ fontSize: 16 }}>
            View All Books
          </a>
        </div>

        <div className="grid4">
          {picked.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}