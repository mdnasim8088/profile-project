import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { writeFiles, type PendingFile } from "@/lib/admin/storage";
import { CONTENT_FILES, MAX_UPLOAD_BYTES, UPLOAD_DIR, type ContentKey } from "@/lib/admin/files";

type SaveBody = {
  files?: Partial<Record<string, unknown>>;
  uploads?: { name?: unknown; data?: unknown }[];
};

const UPLOAD_NAME = /^[a-z0-9][a-z0-9-]{0,80}\.(png|jpe?g|webp)$/;

/** Checks the file really is the image type its name claims (by its first bytes). */
function looksLikeImage(bytes: Buffer, name: string) {
  if (name.endsWith(".png")) return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (name.endsWith(".webp")) return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return bad("Not logged in.", 401);

  // Only accept saves sent from this site's own admin page
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return bad("Bad origin.", 403);

  const body = (await request.json().catch(() => null)) as SaveBody | null;
  if (!body) return bad("Invalid request.");

  const pending: PendingFile[] = [];

  for (const [key, value] of Object.entries(body.files ?? {})) {
    if (!(key in CONTENT_FILES)) return bad(`Unknown content: ${key}`);
    if (value === null || typeof value !== "object") return bad(`Invalid data for ${key}`);
    pending.push({ path: CONTENT_FILES[key as ContentKey], content: JSON.stringify(value, null, 2) + "\n", encoding: "utf-8" });
  }

  for (const upload of body.uploads ?? []) {
    if (typeof upload.name !== "string" || !UPLOAD_NAME.test(upload.name) || typeof upload.data !== "string") {
      return bad("Invalid image upload.");
    }
    const bytes = Buffer.from(upload.data, "base64");
    if (bytes.length > MAX_UPLOAD_BYTES) return bad(`${upload.name} is too large (max 3 MB).`);
    if (!looksLikeImage(bytes, upload.name)) return bad(`${upload.name} is not a valid image.`);
    pending.push({ path: `${UPLOAD_DIR}/${upload.name}`, content: upload.data, encoding: "base64" });
  }

  if (pending.length === 0) return bad("Nothing to save.");

  try {
    const { commitUrl } = await writeFiles(pending, "Update site content from admin panel");
    return NextResponse.json({ ok: true, commitUrl });
  } catch (err) {
    return bad((err as Error).message, 502);
  }
}
