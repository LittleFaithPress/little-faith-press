import Link from "next/link";
import { notFound } from "next/navigation";
import { freebies } from "@/lib/freebies";
import BookImageGallery from "@/components/BookImageGallery";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FreebieDetailPage({ params }: Props) {
  const { id } = await params;
  const freebie = freebies.find((f) => f.id === id);

  if (!freebie) return notFound();

  const ctaHref = freebie.ctaHref ?? "/#mailing-list";
  const ctaLabel = freebie.ctaLabel ?? "Get this Freebie";

  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        {/* Top-right back pill */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/freebies"
            className="pill"
            style={{ padding: "10px 16px" }}
          >
            ← Back to Freebies
          </Link>
        </div>

        {/* Freebie detail card */}
        <div className="card" style={{ padding: 22 }}>
          <div
            className="freebieGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "340px 1fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            {/* ✅ LEFT COLUMN: Shared Image Gallery */}
            <BookImageGallery
              title={freebie.title}
              cover={freebie.image}
              gallery={freebie.gallery}
            />

            {/* RIGHT COLUMN: info */}
            <div style={{ display: "grid", gap: 12 }}>
              <h1 className="h1" style={{ marginBottom: 4 }}>
                {freebie.title}
              </h1>

              <div className="lead" style={{ fontSize: 18 }}>
                {freebie.tagline}
              </div>

              <div style={{ color: "var(--muted)", fontSize: 16, marginTop: 6 }}>
                {freebie.age}
              </div>

              {freebie.description ? (
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 18,
                    lineHeight: 1.6,
                    margin: "8px 0 0",
                  }}
                >
                  {freebie.description}
                </p>
              ) : null}

              {freebie.includes?.length ? (
                <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>
                    What’s included:
                  </div>

                  <ul
  style={{
    margin: 0,
    paddingLeft: 22,
    color: "var(--muted)",
    fontSize: 18,
    lineHeight: 1.6,

    // ✅ force bullets back on (overrides global reset)
    listStyleType: "disc",
    listStylePosition: "outside",
  }}
>
  {freebie.includes.map((item) => (
    <li key={item} style={{ display: "list-item" }}>
      {item}
    </li>
  ))}
</ul>
                </div>
              ) : null}

              {/* CTA */}
              <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  Get this freebie:
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a className="btn" href={ctaHref}>
                    {ctaLabel}
                  </a>
                </div>

                {/* ✅ Conversion booster */}
                {freebie.conversionNote ? (
                  <p
                    style={{
                      opacity: 0.75,
                      marginTop: 2,
                      fontSize: 15,
                      lineHeight: 1.5,
                    }}
                  >
                    {freebie.conversionNote}
                  </p>
                ) : null}

                <div style={{ color: "var(--muted)", fontSize: 16 }}>
                  You’ll enter your email and get the download link.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive tweak */}
        <style>{`
          @media (max-width: 900px){
            .freebieGrid{
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}