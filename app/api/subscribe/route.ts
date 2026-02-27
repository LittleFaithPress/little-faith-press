import { NextResponse } from "next/server";

type Payload = {
  firstName?: string;
  email: string;
  website?: string; // honeypot (bot trap)
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const kitKey = process.env.KIT_API_KEY;     // your V4 key
  const formId = process.env.KIT_FORM_ID;     // 9140364

  if (!kitKey || !formId) {
    return NextResponse.json(
      { ok: false, message: "Missing KIT_API_KEY or KIT_FORM_ID." },
      { status: 500 }
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON." },
      { status: 400 }
    );
  }

  // Honeypot: bots fill hidden fields
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = (body.firstName || "").trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email." },
      { status: 400 }
    );
  }

  const referrer = process.env.SITE_URL || "http://localhost:3000";

  try {
    // 1️⃣ Upsert subscriber
    const createRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": kitKey,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || null,
        state: "active",
        fields: { Source: "Little Faith Press website" },
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({}));
      return NextResponse.json(
        { ok: false, message: "Kit subscriber create failed.", details: err },
        { status: 502 }
      );
    }

    // 2️⃣ Add subscriber to your form
    const addRes = await fetch(
      `https://api.kit.com/v4/forms/${formId}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": kitKey,
        },
        body: JSON.stringify({
          email_address: email,
          referrer,
        }),
      }
    );

    if (!addRes.ok) {
      const err = await addRes.json().catch(() => ({}));
      return NextResponse.json(
        { ok: false, message: "Kit add-to-form failed.", details: err },
        { status: 502 }
      );
    }

    // ✅ UPDATED SUCCESS MESSAGE
    return NextResponse.json({
      ok: true,
      message:
        "You're in! 🎉\n\nYour free printable is on its way to your inbox.\nPlease check your Promotions or Spam folder just in case.",
    });

  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        message: "Server error subscribing.",
        details: String(e?.message || e),
      },
      { status: 500 }
    );
  }
}