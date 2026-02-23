import {
  TrafficSubscriberPills,
  StoreSnapshotPills,
  SocialSnapshotPills,
} from "@/components/AdminWidgetCounters";
import Link from "next/link";
import { adminLinkGroups } from "@/lib/adminLinks";

/* ✅ ICONS (Lucide — already used in your project) */
import {
  Instagram,
  Facebook,
  Link as LinkIcon,
  ShoppingBag,
  BookOpen,
  BarChart3,
  ExternalLink,
  Mail,
  Users,
  LineChart,
  Megaphone,
} from "lucide-react";

/* ✅ label+href → icon mapper (safe + non-breaking) */
function getIcon(label: string, href: string) {
  const haystack = `${label} ${href}`.toLowerCase();

  if (haystack.includes("linktr.ee")) return <LinkIcon size={18} />;
  if (haystack.includes("kit.com")) return <Mail size={18} />;
  if (haystack.includes("instagram.com")) return <Instagram size={18} />;
  if (haystack.includes("facebook.com")) return <Facebook size={18} />;
  if (haystack.includes("pinterest.com")) return <ExternalLink size={18} />;
  if (haystack.includes("tiktok.com")) return <ExternalLink size={18} />;
  if (haystack.includes("etsy.com")) return <ShoppingBag size={18} />;
  if (haystack.includes("author.amazon") || haystack.includes("amazon.com"))
    return <BookOpen size={18} />;
  if (haystack.includes("kdp.amazon")) return <BarChart3 size={18} />;

  return <ExternalLink size={18} />;
}

export default function AdminPage() {
  return (
    <>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="card" style={{ padding: 22, flex: "1 1 520px" }}>
          <h1 className="h1">Admin</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            Draft emails, track stats, and manage content. (Sending comes later.)
          </p>
        </div>

        <form method="POST" action="/api/admin/logout">
          <button className="btn" type="submit">
            Sign out
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="card" style={{ padding: 22 }}>
        <h2 className="h2">Quick Links</h2>
        <p className="lead" style={{ marginTop: 10 }}>
          One-click access to your platforms.
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
          {adminLinkGroups.map((group) => (
            <div key={group.title} style={{ display: "grid", gap: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{group.title}</div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {group.links.map((l) => (
                  <a
                    key={l.label}
                    className="btn"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {getIcon(l.label, l.href)}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tiles */}
      <div
        className="grid4"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))" as any,
        }}
      >
        <Link href="/admin/email-drafts" style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ padding: 18, display: "grid", gap: 8, cursor: "pointer" }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Email Drafts</div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Create drafts and copy them into Kit for now.
            </div>
          </div>
        </Link>

        <Link href="/admin/stats" style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ padding: 18, display: "grid", gap: 8, cursor: "pointer" }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Store Stats</div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Manual entry now. Automate later.
            </div>
          </div>
        </Link>

        <Link href="/admin/stats" style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ padding: 18, display: "grid", gap: 8, cursor: "pointer" }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Social Stats</div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Track IG/FB growth. Add integrations later.
            </div>
          </div>
        </Link>
      </div>

      {/* ✅ Dashboard Widgets (now pulls real stats) */}
      <div className="card" style={{ padding: 22 }}>
        <h2 className="h2">Dashboard Widgets</h2>
        <p className="lead" style={{ marginTop: 10 }}>
          Quick snapshots. Manual now. Automations later.
        </p>

        <div
          className="grid4"
          style={{
            marginTop: 16,
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))" as any,
          }}
        >
          <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Users size={18} />
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                Traffic + Subscribers
              </div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Add site visits + list size (manual entry for now).
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <TrafficSubscriberPills />
            </div>
          </div>

          <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LineChart size={18} />
              <div style={{ fontSize: 18, fontWeight: 600 }}>Store Snapshot</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Track clicks/sales later. Manual placeholders now.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StoreSnapshotPills />
            </div>
          </div>

          <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Megaphone size={18} />
              <div style={{ fontSize: 18, fontWeight: 600 }}>Social Snapshot</div>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 16 }}>
              Track follower counts + growth manually for now.
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <SocialSnapshotPills />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px){
          .grid4{ grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}