import Link from "next/link";
import FreebieCard from "@/components/FreebieCard";
import { freebies } from "@/lib/freebies";

export default function FreebiesPage() {
  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
  <h1 className="h1">Freebies</h1>

  <p className="lead" style={{ marginTop: 10 }}>
    Grab faith-based printables and screen-free activities for ages 3–6.
  </p>

  {/* Bullet section */}
  <ul
    style={{
      marginTop: 16,
      paddingLeft: 22,
      color: "var(--muted)",
      fontSize: 18,
      lineHeight: 1.6,
      listStyleType: "disc",
    }}
  >
    <li>Flash card companions</li>
    <li>Matching games</li>
    <li>Simple coloring pages</li>
    <li>Quiet-time activity sheets</li>
  </ul>

  <p
    style={{
      marginTop: 14,
      color: "var(--muted)",
      fontSize: 18,
      lineHeight: 1.5,
    }}
  >
    Coming next: a dedicated download page with your featured freebie and a simple
    “how to use it” guide.
  </p>
</div>

        <div className="card" style={{ padding: 22 }}>
          <h2 className="h2">Featured Freebies</h2>
          <p className="lead" style={{ marginTop: 10 }}>
            Download faith-based printables and screen-free activities designed for ages 3–6.
          </p>

          <div style={{ marginTop: 16 }} className="grid4">
            {freebies.map((f) => (
              <FreebieCard key={f.id} freebie={f} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}