import Link from "next/link";
import AdminBack from "@/components/AdminBack";

export default function AdminCrumbBar({ title }: { title: string }) {
  return (
    <div
      className="card"
      style={{
        padding: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/admin" style={{ textDecoration: "none" }}>
          <span style={{ fontWeight: 700, cursor: "pointer" }}>Admin</span>
        </Link>
        <span style={{ opacity: 0.6 }}>/</span>
        <span style={{ fontWeight: 700 }}>{title}</span>
      </div>

      {/* Uses your existing button style, margin removed for bar placement */}
      <AdminBack style={{ marginBottom: 0 }} />
    </div>
  );
}