import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { readContent, storageMode } from "@/lib/admin/storage";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  try {
    return NextResponse.json({ mode: storageMode(), content: await readContent() });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
