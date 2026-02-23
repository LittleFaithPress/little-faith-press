import Link from "next/link";

export default function AdminBack({
  label = "← Back to Admin",
  href = "/admin",
  style,
}: {
  label?: string;
  href?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <button className="btn" style={{ marginBottom: 12, ...style }}>
        {label}
      </button>
    </Link>
  );
}