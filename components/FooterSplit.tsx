import Year from "@/components/Year";
import NewsletterForm from "@/components/NewsletterForm";

export default function FooterSplit() {
  return (
    <footer 
     id="mailing-list"
     style={{ padding: "0 0 34px", position: "relative" }}>
      {/* FULL-WIDTH DIAGONAL BACKGROUND */}
      <div className="footerBg" />

      <div className="container" style={{ position: "relative" }}>
        {/* CONTENT CARD (NO DIAGONAL INSIDE) */}
        <div className="card" style={{ padding: 22 }}>
          <div
            className="footerSplitGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr .95fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* LEFT */}
            <div style={{ padding: "10px 8px" }}>
              <div style={{ maxWidth: 520, display: "grid", gap: 14 }}>
                <h2 className="h2">Why families choose Little Faith Press</h2>
                <p className="lead" style={{ fontSize: 18 }}>
                  Simple faith-based content with toddler-friendly design, built for real life routines.
                </p>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    color: "var(--text)",
                    fontSize: 18,
                    lineHeight: 1.45,
                    listStyleType: "disc",
                    listStylePosition: "outside",
                  }}
                >
                  <li>Bold coloring with toddler-friendly spacing</li>
                  <li>Short Bible stories little ones understand</li>
                  <li>Screen-free activities for calmer days</li>
                  <li>Designed for ages 3–6 and busy parents</li>
                </ul>
              </div>
            </div>

            {/* RIGHT */}
            <div
              style={{
                borderRadius: 16,
                padding: 18,
                background: "var(--navy)",
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div
  className="footerCopyright"
  style={{
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
  }}
>
  © <Year /> Little Faith Press
</div>
      </div>
    </footer>
  );
}