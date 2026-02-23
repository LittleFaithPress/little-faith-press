export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18 }}>
        {children}
      </div>
    </main>
  );
}