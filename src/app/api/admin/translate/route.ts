import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";

/**
 * English → Arabic machine translation for the admin panel.
 * Uses Google Translate's free web endpoint, with MyMemory as a fallback. No API key needed.
 */

const MAX_TEXTS = 30;
const MAX_CHARS = 5000;

async function viaGoogle(text: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Google ${res.status}`);
  const data = (await res.json()) as [[string, string][]];
  const out = data[0].map((seg) => seg[0]).join("");
  if (!out) throw new Error("Empty translation");
  return out;
}

async function viaMyMemory(text: string) {
  // MyMemory accepts ~500 characters per request, so translate line by line
  const lines = text.split("\n");
  const done: string[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      done.push(line);
      continue;
    }
    const url = `https://api.mymemory.translated.net/get?langpair=en|ar&q=${encodeURIComponent(line.slice(0, 500))}`;
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    const data = (await res.json()) as { responseData?: { translatedText?: string } };
    const t = data.responseData?.translatedText;
    if (!res.ok || !t) throw new Error("MyMemory failed");
    done.push(t);
  }
  return done.join("\n");
}

async function translate(text: string) {
  if (!text.trim()) return text;
  try {
    return await viaGoogle(text);
  } catch {
    return await viaMyMemory(text);
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { texts?: unknown } | null;
  const texts = body?.texts;
  if (!Array.isArray(texts) || texts.length > MAX_TEXTS || !texts.every((t) => typeof t === "string" && t.length <= MAX_CHARS)) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  try {
    const translations = await Promise.all((texts as string[]).map(translate));
    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ error: "Translation service unavailable." }, { status: 502 });
  }
}
