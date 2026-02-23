import BookImageGallery from "@/components/BookImageGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/lib/books";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// ✅ Set this to your real domain after deploy (or keep Vercel URL)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

function toAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return {
      title: "Book Not Found | Little Faith Press",
      description: "This book could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${book.title} | Little Faith Press`;
  const description =
    book.tagline ||
    `Explore ${book.title} from Little Faith Press, designed for ${book.age}.`;

  const images = [book.image, ...(book.gallery ?? [])]
    .filter(Boolean)
    .map(toAbsoluteUrl);

  const canonical = `${SITE_URL}/books/${book.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: images.length ? images.map((url) => ({ url })) : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length ? [images[0]] : undefined,
    },
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);

  if (!book) return notFound();

  const buy = book.buyLinks ?? {};

  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        {/* Top-right back pill */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link href="/books" className="pill" style={{ padding: "10px 16px" }}>
            ← Back to Books
          </Link>
        </div>

        {/* Book detail card */}
        <div className="card" style={{ padding: 22 }}>
          <div
            className="bookGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "340px 1fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            {/* LEFT COLUMN: cover + gallery */}
            <BookImageGallery
              title={book.title}
              cover={book.image}
              gallery={book.gallery}
            />

            {/* RIGHT COLUMN: info */}
            <div style={{ display: "grid", gap: 12 }}>
              <h1 className="h1" style={{ marginBottom: 4 }}>
                {book.title}
              </h1>

              <div className="lead" style={{ fontSize: 18 }}>
                {book.tagline}
              </div>

              {/* Non-pill meta line (not clickable-looking) */}
              <div style={{ color: "var(--muted)", fontSize: 16, marginTop: 6 }}>
                {book.series} • {book.age}
              </div>

              {/* Buy buttons */}
              <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Get this book:</div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {buy.amazon && (
                    <a className="btn" href={buy.amazon} target="_blank" rel="noreferrer">
                      Amazon
                    </a>
                  )}
                  {buy.kindle && (
                    <a className="btn" href={buy.kindle} target="_blank" rel="noreferrer">
                      Kindle
                    </a>
                  )}
                  {buy.etsy && (
                    <a className="btn" href={buy.etsy} target="_blank" rel="noreferrer">
                      Etsy
                    </a>
                  )}
                </div>

                {!buy.amazon && !buy.kindle && !buy.etsy && (
                  <div style={{ color: "var(--muted)", fontSize: 16 }}>
                    Links coming soon.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Responsive tweak */}
        <style>{`
          @media (max-width: 900px){
            .bookGrid{
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}