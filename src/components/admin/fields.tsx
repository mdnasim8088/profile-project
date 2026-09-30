"use client";

import { createContext, useContext, useRef, useState } from "react";
import { ImagePlus, Plus, Trash2, X } from "lucide-react";
import type { Field } from "./schema";

/* ---------- Image uploads (kept in memory until Save) ---------- */

type UploadsApi = {
  /** Resizes and stores the file; returns the public URL it will have once saved. */
  add: (file: File) => Promise<string>;
  /** Preview URL for an image that is not saved yet, else the URL itself. */
  preview: (url: string) => string;
};

export const UploadsContext = createContext<UploadsApi | null>(null);

const useUploads = () => {
  const api = useContext(UploadsContext);
  if (!api) throw new Error("UploadsContext missing");
  return api;
};

/* ---------- Shared styles ---------- */

export const inputCls =
  "w-full rounded-xl border border-[#E4DDD2] bg-white px-3.5 py-2.5 text-sm text-[#17140F] outline-none transition focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/15";
const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-[#5C564E] mb-1.5";
const smallBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-[#E4DDD2] bg-white px-2.5 py-1.5 text-xs font-bold text-[#5C564E] hover:border-[#F05A1A] hover:text-[#F05A1A] transition cursor-pointer";

/* ---------- Basic inputs ---------- */

function TextInput({ value, onChange, rtl, multiline }: { value: string; onChange: (v: string) => void; rtl?: boolean; multiline?: boolean }) {
  const common = { value, dir: rtl ? "rtl" : "ltr", className: inputCls } as const;
  return multiline ? (
    <textarea {...common} rows={Math.min(8, Math.max(3, Math.ceil(value.length / 70)))} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input {...common} type="text" onChange={(e) => onChange(e.target.value)} />
  );
}

export function ListInput({ value, onChange, rtl }: { value: string[]; onChange: (v: string[]) => void; rtl?: boolean }) {
  const set = (i: number, v: string) => onChange(value.map((x, j) => (j === i ? v : x)));
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input className={inputCls} dir={rtl ? "rtl" : "ltr"} value={item} onChange={(e) => set(i, e.target.value)} />
          <button type="button" className={smallBtn} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button type="button" className={smallBtn} onClick={() => onChange([...value, ""])}>
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  );
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const uploads = useUploads();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploads.add(file));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-3">
      <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-xl border border-dashed border-[#D6CEC2] bg-[repeating-conic-gradient(#EFEAE2_0_25%,#fff_0_50%)] bg-[length:16px_16px] flex items-center justify-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of local/pending uploads
          <img src={uploads.preview(value)} alt="" className="w-full h-full object-contain" />
        ) : (
          <ImagePlus className="w-7 h-7 text-[#B5AC9F]" />
        )}
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => pick(e.target.files?.[0])} />
        <button type="button" className={smallBtn} disabled={busy} onClick={() => fileRef.current?.click()}>
          <ImagePlus className="w-3.5 h-3.5" /> {busy ? "Processing…" : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button type="button" className={smallBtn} onClick={() => onChange("")}>
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
        <span className="text-[11px] text-[#8F877C] break-all">{value || "No image"}</span>
        {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
      </div>
    </div>
  );
}

/* ---------- One schema field (English + Arabic side by side when bilingual) ---------- */

export function FieldEditor({ field, data, onChange }: { field: Field; data: Record<string, unknown>; onChange: (key: string, value: unknown) => void }) {
  const render = (key: string, rtl: boolean) => {
    const value = data[key];
    switch (field.type) {
      case "number":
        return (
          <input
            type="number"
            className={inputCls}
            min={field.min}
            max={field.max}
            value={typeof value === "number" ? value : 0}
            onChange={(e) => onChange(key, e.target.value === "" ? 0 : Number(e.target.value))}
          />
        );
      case "select":
        return (
          <select className={inputCls} value={String(value ?? "")} onChange={(e) => onChange(key, e.target.value)}>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case "list":
        return <ListInput value={Array.isArray(value) ? (value as string[]) : []} onChange={(v) => onChange(key, v)} rtl={rtl} />;
      case "image":
        return <ImageInput value={String(value ?? "")} onChange={(v) => onChange(key, v)} />;
      default:
        return <TextInput value={String(value ?? "")} onChange={(v) => onChange(key, v)} rtl={rtl} multiline={field.type === "textarea"} />;
    }
  };

  const wide = field.bilingual || field.type === "textarea" || field.type === "list" || field.type === "image";

  return (
    <div className={wide ? "md:col-span-2" : ""}>
      {field.bilingual ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className={labelCls}>{field.label} · English</label>
            {render(field.key, false)}
          </div>
          <div>
            <label className={labelCls}>{field.label} · العربية</label>
            {render(field.key + "Ar", true)}
          </div>
        </div>
      ) : (
        <>
          <label className={labelCls}>{field.label}</label>
          {render(field.key, false)}
        </>
      )}
      {field.help && <p className="mt-1.5 text-[11px] text-[#8F877C]">{field.help}</p>}
    </div>
  );
}
