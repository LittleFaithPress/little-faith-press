import Image from "next/image";
import Link from "next/link";
import type { Freebie } from "@/lib/freebies";

export default function FreebieCard({ freebie }: { freebie: Freebie }) {
  const CardContent = (
    <div className="card" style={{ padding: 18, display: "grid", gap: 16 }}>
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
          src={freebie.image}
          alt={freebie.title}
          width={800}
          height={500}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 20 }}>
          <strong>{freebie.title}</strong>
        </div>

        <div style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.4 }}>
          {freebie.tagline}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
        <span
          className="pill"
          style={{ fontSize: 15, padding: "8px 14px", borderColor: "rgba(24,47,92,.25)" }}
        >
          View Freebie
        </span>
      </div>
    </div>
  );

  return (
    <Link href={`/freebies/${freebie.id}`} style={{ textDecoration: "none" }}>
  {CardContent}
</Link>
  );
}