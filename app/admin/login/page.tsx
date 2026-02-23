export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams?.next ?? "/admin";

  return (
    <main style={{ padding: "26px 0 44px" }}>
      <div className="container" style={{ display: "grid", gap: 18, maxWidth: 560 }}>
        <div className="card" style={{ padding: 22 }}>
          <h1 className="h1">Admin Login</h1>
          <p className="lead" style={{ marginTop: 10 }}>
            Private area for Little Faith Press.
          </p>

          <form
            method="POST"
            action="/api/admin/login"
            style={{ marginTop: 18, display: "grid", gap: 12 }}
          >
            <input type="hidden" name="next" value={next} />

            <label style={{ fontSize: 16, color: "var(--muted)" }}>
              Password
              <input
                name="password"
                type="password"
                required
                style={{
                  marginTop: 6,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 14,
                  border: "1px solid var(--stroke)",
                  background: "rgba(24,47,92,.04)",
                  fontSize: 18,
                }}
              />
            </label>

            <button className="btn" type="submit" style={{ width: "fit-content" }}>
              Sign in
            </button>

            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
              Tip: You’ll set your password in <code>.env.local</code>.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}