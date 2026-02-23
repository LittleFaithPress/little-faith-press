import Link from "next/link";

export default function Hero() {
  return (
    <section style={{ padding: "45px 0 40px" }}>
      <div className="container">
        <div className="card" style={{ padding: "26px 22px" }}>
          <div style={{ maxWidth: 860, display: "grid", gap: 18 }}>
            <h1 className="h1">Faith-filled stories and calm screen-free activities for ages 3–6.</h1>
            <p className="lead">
             Simple stories, coloring books, and printable activities designed to support faith, 
             family connection, and calm screen-free moments.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link className="btn btnPrimary" href="/books">
                Explore Books
              </Link>
              <Link className="btn" href="/freebies">
                Explore Freebies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}