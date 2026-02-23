import Image from "next/image";

export default function AboutPage() {
  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        {/* ABOUT HERO WITH AUTHOR IMAGE */}
        <div className="card" style={{ padding: 22 }}>
          <div
            className="aboutGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            {/* Author Image */}
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid var(--stroke)",
                boxShadow: "0 0 0 6px rgba(245,243,239,.9)",
              }}
            >
              <Image
                src="/author/author.jpeg"
                alt="Petrus Fourie"
                width={300}
                height={300}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            </div>

            {/* Text */}
            <div>
              <h1 className="h1">About Little Faith Press</h1>

              <p className="lead" style={{ marginTop: 10 }}>
                Little Faith Press creates children’s books and printable activities 
                designed to help families slow down, connect, and build meaningful routines together. 
                From faith-based stories to everyday family adventures and screen-free learning activities, 
                each resource is created with simplicity and real family life in mind.
              </p>

              <p
                style={{
                  marginTop: 10,
                  color: "var(--muted)",
                  fontSize: 18,
                  lineHeight: 1.6,
                }}
              >
                Founded by Petrus J. Fourie, Little Faith Press focuses on short read-aloud stories, 
                gentle storytelling, and practical activities created specifically for ages 3–6. 
                Each book is designed to support calm learning, shared reading, and meaningful parent-child 
                moments that fit naturally into busy family routines.
              </p>

              <p
                style={{
                  marginTop: 10,
                  color: "var(--muted)",
                  fontSize: 18,
                  lineHeight: 1.6,
                }}
              >
                Through gentle storytelling and practical printables, Little
                Faith Press helps parents create everyday moments that feel
                peaceful, joyful, and rooted in faith.
              </p>
            </div>
          </div>
        </div>

        {/* WHY IT EXISTS */}
        <div className="card" style={{ padding: 22 }}>
          <h2 className="h2">Why it exists</h2>

          <p
            style={{
              marginTop: 10,
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--text)" }}>
              Simple stories and activities for real family life.
            </strong>
          </p>

          <p
            style={{
              marginTop: 6,
              color: "var(--muted)",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Families are busy. Children are often overstimulated, and meaningful
            connection can feel difficult to prioritize. Little Faith Press
            exists to offer simple tools that invite connection through short
            stories, gentle moments, and activities that support faith and family
            time without adding pressure.
          </p>
        </div>

        {/* Responsive behavior */}
        <style>{`
          @media (max-width: 900px){
            .aboutGrid{
              grid-template-columns: 1fr !important;
              text-align: center;
              justify-items: center;
            }
          }
        `}</style>
      </div>
    </main>
  );
}