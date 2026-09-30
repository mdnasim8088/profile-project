import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, isPasswordConfigured, SESSION_COOKIE } from "@/lib/admin/auth";

// Slow down password guessing a little
const FAILED_LOGIN_DELAY_MS = 800;

export async function POST(request: Request) {
  if (!isPasswordConfigured()) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 503 });
  }

  const { password } = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (typeof password !== "string" || !checkPassword(password)) {
    await new Promise((r) => setTimeout(r, FAILED_LOGIN_DELAY_MS));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const { token, maxAge } = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  return res;
}
