"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, LogOut, Menu, Save, TriangleAlert, X } from "lucide-react";
import { UploadsContext } from "./fields";
import { CollectionEditor, MessagesEditor, ObjectEditor, type Json } from "./editors";
import { SECTIONS, type CollectionSection, type Section } from "./schema";
import { MAX_UPLOAD_BYTES, UPLOAD_URL_PREFIX, type ContentBundle, type ContentKey } from "@/lib/admin/files";

type Mode = "github" | "local" | "unconfigured";
type Status = { kind: "idle" } | { kind: "saving" } | { kind: "saved"; commitUrl?: string } | { kind: "error"; message: string };
type Upload = { data: string; previewUrl: string };

const MAX_IMAGE_SIDE = 1600;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/** Scales an image down to MAX_IMAGE_SIDE and re-encodes it (PNG keeps transparency). */
async function processImage(file: File): Promise<{ name: string; blob: Blob }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const encode = (type: string, quality?: number) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, quality));
  let blob: Blob | null;
  let ext: string;
  if (file.type === "image/png") {
    blob = await encode("image/png");
    ext = "png";
  } else {
    blob = await encode("image/webp", 0.85);
    ext = "webp";
    // Some browsers can't encode WebP and silently return PNG instead
    if (!blob || blob.type !== "image/webp") {
      blob = await encode("image/jpeg", 0.85);
      ext = "jpg";
    }
  }
  if (!blob) throw new Error("Could not process this image.");
  if (blob.size > MAX_UPLOAD_BYTES) throw new Error("Image is too large even after resizing (max 3 MB). Try a smaller file.");

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  return { name: `${base}-${Date.now().toString(36)}.${ext}`, blob };
}

const toBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

/** Fills in missing ids/slugs and reports problems that would break the site. */
function prepare(content: ContentBundle): { content: ContentBundle; problems: string[] } {
  const problems: string[] = [];
  const next = { ...content };
  for (const s of SECTIONS) {
    if (s.kind !== "collection") continue;
    const items = (next[s.key] as Record<string, unknown>[]).map((it) => ({ ...it }));
    const seen = new Set<string>();
    items.forEach((it, i) => {
      const titleText = String(it[s.titleKey] ?? "");
      if ("slug" in it || s.key === "projects") {
        it.slug = slugify(String(it.slug || titleText)) || `project-${i + 1}`;
        if (seen.has("slug:" + it.slug)) problems.push(`${s.title}: two items use the URL slug "${it.slug}".`);
        seen.add("slug:" + it.slug);
      }
      it.id = slugify(String(it.id || "")) || slugify(titleText) || `${s.key}-${i + 1}`;
      if (seen.has("id:" + it.id)) it.id = `${it.id}-${i + 1}`;
      seen.add("id:" + it.id);
      if (!titleText.trim()) problems.push(`${s.title}: item ${i + 1} has no ${s.titleKey}.`);
    });
    next[s.key] = items;
  }
  return { content: next, problems };
}

export function AdminApp() {
  const [mode, setMode] = useState<Mode>("local");
  const [content, setContent] = useState<ContentBundle | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [loadError, setLoadError] = useState("");
  const [active, setActive] = useState<Section["key"]>("site");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [navOpen, setNavOpen] = useState(false);
  const uploads = useRef(new Map<string, Upload>());

  const load = useCallback(async () => {
    setLoadError("");
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    const json = await res.json().catch(() => ({}));
    if (res.status === 401) return window.location.reload();
    if (!res.ok) return setLoadError(json.error || "Could not load content.");
    setMode(json.mode);
    setContent(json.content);
    setSavedSnapshot(JSON.stringify(json.content));
  }, []);

  useEffect(() => {
    // Fetch once on mount; state is set when the request resolves
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const dirty = content !== null && JSON.stringify(content) !== savedSnapshot;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const uploadsApi = useMemo(
    () => ({
      add: async (file: File) => {
        const { name, blob } = await processImage(file);
        uploads.current.set(UPLOAD_URL_PREFIX + name, { data: await toBase64(blob), previewUrl: URL.createObjectURL(blob) });
        return UPLOAD_URL_PREFIX + name;
      },
      preview: (url: string) => uploads.current.get(url)?.previewUrl ?? url,
    }),
    [],
  );

  const setKey = (key: ContentKey, value: unknown) => {
    setContent((c) => (c ? { ...c, [key]: value } : c));
    if (status.kind !== "saving") setStatus({ kind: "idle" });
  };

  const save = async () => {
    if (!content) return;
    const { content: prepared, problems } = prepare(content);
    if (problems.length) return setStatus({ kind: "error", message: problems.join(" ") });

    setStatus({ kind: "saving" });
    const serialized = JSON.stringify(prepared);
    const before = JSON.parse(savedSnapshot) as ContentBundle;
    // Send only the files that changed, plus images that are still used somewhere
    const files = Object.fromEntries(
      (Object.keys(prepared) as ContentKey[]).filter((k) => JSON.stringify(prepared[k]) !== JSON.stringify(before[k])).map((k) => [k, prepared[k]]),
    );
    const pendingUploads = [...uploads.current.entries()]
      .filter(([url]) => serialized.includes(JSON.stringify(url).slice(1, -1)))
      .map(([url, u]) => ({ name: url.slice(UPLOAD_URL_PREFIX.length), data: u.data }));

    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files, uploads: pendingUploads }),
    }).catch(() => null);
    const json = res ? await res.json().catch(() => ({})) : {};
    if (!res?.ok) {
      if (res?.status === 413) return setStatus({ kind: "error", message: "Too much data in one save — upload fewer images at a time." });
      return setStatus({ kind: "error", message: json.error || "Save failed. Check your connection and try again." });
    }
    uploads.current.clear();
    setContent(prepared);
    setSavedSnapshot(serialized);
    setStatus({ kind: "saved", commitUrl: json.commitUrl });
  };

  const logout = async () => {
    if (dirty && !confirm("You have unsaved changes. Log out anyway?")) return;
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center space-y-4">
          <TriangleAlert className="w-8 h-8 mx-auto text-red-500" />
          <p className="text-sm text-[#5C564E]">{loadError}</p>
          <button onClick={load} className="rounded-xl bg-[#17140F] px-4 py-2 text-sm font-bold text-white cursor-pointer">
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 text-[#5C564E]">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading content…
      </div>
    );
  }

  const section = SECTIONS.find((s) => s.key === active)!;

  return (
    <UploadsContext.Provider value={uploadsApi}>
      <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 start-0 z-40 w-[260px] border-e border-[#E4DDD2] bg-[#F7F4EF] p-4 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-2 pb-5">
            <div>
              <p className="font-display text-lg font-extrabold text-[#17140F]">
                Admin<span className="text-[#F05A1A]">.</span>
              </p>
              <p className="text-[11px] font-semibold text-[#8F877C]">Portfolio content</p>
            </div>
            <button className="md:hidden p-2 cursor-pointer" onClick={() => setNavOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  setActive(s.key);
                  setNavOpen(false);
                  window.scrollTo({ top: 0 });
                }}
                className={`w-full rounded-xl px-3 py-2.5 text-start text-sm font-semibold transition cursor-pointer ${
                  active === s.key ? "bg-[#17140F] text-white" : "text-[#5C564E] hover:bg-white hover:text-[#17140F]"
                }`}
              >
                {s.title}
                {s.kind === "collection" && (
                  <span className={`float-end text-xs ${active === s.key ? "text-white/60" : "text-[#B5AC9F]"}`}>
                    {(content[s.key] as unknown[]).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="absolute inset-x-4 bottom-4 space-y-1">
            <a href="/en" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#5C564E] hover:bg-white">
              <ExternalLink className="w-4 h-4" /> View website
            </a>
            <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#5C564E] hover:bg-white cursor-pointer">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </aside>
        {navOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setNavOpen(false)} />}

        {/* Main */}
        <main className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-[#E4DDD2] bg-[#F7F4EF]/90 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 md:px-8">
              <button className="md:hidden p-2 -ms-2 cursor-pointer" onClick={() => setNavOpen(true)} aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {status.kind === "saved" ? (
                    <span className="inline-flex items-center gap-1.5 text-green-700">
                      <CheckCircle2 className="w-4 h-4" />
                      {mode === "github" ? "Saved. The live site updates in about 1–2 minutes." : "Saved to the project files."}
                      {status.commitUrl && (
                        <a href={status.commitUrl} target="_blank" className="underline">
                          commit
                        </a>
                      )}
                    </span>
                  ) : status.kind === "error" ? (
                    <span className="text-red-600 whitespace-normal">{status.message}</span>
                  ) : dirty ? (
                    <span className="text-[#F05A1A]">Unsaved changes</span>
                  ) : (
                    <span className="text-[#8F877C]">All changes saved</span>
                  )}
                </p>
              </div>
              <button
                onClick={save}
                disabled={!dirty || status.kind === "saving" || mode === "unconfigured"}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-grad px-4 py-2.5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(240,90,26,0.3)] disabled:opacity-40 disabled:shadow-none cursor-pointer"
              >
                {status.kind === "saving" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {mode === "github" ? "Save & Publish" : "Save"}
              </button>
            </div>
            {mode === "unconfigured" && (
              <p className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800 md:px-8">
                Saving is off: set GITHUB_TOKEN and GITHUB_REPO in the Vercel project settings.
              </p>
            )}
          </header>

          <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
            <h1 className="font-display text-2xl font-extrabold text-[#17140F]">{section.title}</h1>
            <p className="mt-1 mb-6 text-sm text-[#5C564E]">{section.description}</p>

            {section.kind === "collection" && (
              <CollectionEditor
                section={section as CollectionSection}
                items={content[section.key] as Record<string, unknown>[]}
                onChange={(v) => setKey(section.key, v)}
              />
            )}
            {section.kind === "object" && (
              <ObjectEditor section={section} data={content[section.key] as Record<string, unknown>} onChange={(v) => setKey(section.key, v)} />
            )}
            {section.kind === "messages" && (
              <MessagesEditor
                en={content.messagesEn as Json}
                ar={content.messagesAr as Json}
                onChange={(en, ar) => {
                  setContent((c) => (c ? { ...c, messagesEn: en, messagesAr: ar } : c));
                  setStatus({ kind: "idle" });
                }}
              />
            )}
          </div>
        </main>
      </div>
    </UploadsContext.Provider>
  );
}
