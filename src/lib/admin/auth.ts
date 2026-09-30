import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Password login for the admin panel. The password lives in the ADMIN_PASSWORD
 * environment variable; a successful login sets a signed, httpOnly session cookie.
 */
export const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function secret() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  // ADMIN_SESSION_SECRET is optional; changing it (or the password) logs everyone out
  return `${process.env.ADMIN_SESSION_SECRET ?? ""}:${password}`;
}

function sign(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input: string) {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && safeEqual(sign(input, "pw"), sign(password!, "pw"));
}

export function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD is not set");
  const expires = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return { token: `${expires}.${sign(expires, key)}`, maxAge: SESSION_DAYS * 24 * 60 * 60 };
}

function isValidToken(token: string | undefined) {
  const key = secret();
  if (!key || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires, key));
}

export async function isAuthenticated() {
  const store = await cookies();
  return isValidToken(store.get(SESSION_COOKIE)?.value);
}
