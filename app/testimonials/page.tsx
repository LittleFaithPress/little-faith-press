import Stars from "@/components/Stars";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialsPage() {
  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <h1 className="h1">Testimonials</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            Real words from families using Little Faith Press at home.
          </p>
        </div>

        <div
          className="grid4"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" as any }}
        >
          {testimonials.map((t) => (
            <div
              key={t.title}
              className="card"
              style={{ padding: 18, display: "grid", gap: 10 }}
            >
              {/* Stars */}
              <div style={{ marginBottom: 2 }}>
                <Stars rating={t.rating} />
              </div>

              {/* Title */}
              <div style={{ fontSize: 20, lineHeight: 1.2 }}>
                <strong>{t.title}</strong>
              </div>

              {/* Body */}
              <div style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.45 }}>
                {t.body}
              </div>

              {/* Author (optional) */}
              {t.author && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 15,
                    color: "var(--muted)",
                    fontStyle: "italic",
                  }}
                >
                  — {t.author}
                </div>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 980px){
            .grid4{ grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </main>
  );
}