import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminPassword || password !== adminPassword) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("next", next);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set("lfp_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // secure: true, // enable automatically on HTTPS deploy
  });
  return res;
}