"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Copy, Plus, Trash2 } from "lucide-react";
import { FieldEditor, ListInput, inputCls } from "./fields";
import { emptyItem, type CollectionSection, type ObjectSection } from "./schema";

type Item = Record<string, unknown>;

const iconBtn =
  "p-2 rounded-lg border border-[#E4DDD2] bg-white text-[#5C564E] hover:border-[#F05A1A] hover:text-[#F05A1A] disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer";

/* ---------- Lists of cards (projects, services, jobs, ...) ---------- */

export function CollectionEditor({ section, items, onChange }: { section: CollectionSection; items: Item[]; onChange: (items: Item[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);

  const update = (i: number, key: string, value: unknown) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: value } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
    setOpen(open === i ? i + dir : open);
  };
  const remove = (i: number) => {
    const name = String(items[i][section.titleKey] || `this ${section.itemLabel}`);
    if (!confirm(`Delete "${name}"?`)) return;
    onChange(items.filter((_, j) => j !== i));
    setOpen(null);
  };
  const duplicate = (i: number) => {
    const copy = { ...items[i], id: "", ...("slug" in items[i] ? { slug: "" } : {}) };
    onChange([...items.slice(0, i + 1), copy, ...items.slice(i + 1)]);
    setOpen(i + 1);
  };
  const add = () => {
    onChange([...items, emptyItem(section)]);
    setOpen(items.length);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const heading = String(item[section.titleKey] || "") || `New ${section.itemLabel}`;
        return (
          <div key={i} className={`rounded-2xl border bg-white/80 transition ${isOpen ? "border-[#F05A1A]/50 shadow-[0_8px_24px_rgba(240,90,26,0.08)]" : "border-[#E4DDD2]"}`}>
            <div className="flex items-center gap-2 p-3 ps-4">
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex flex-1 min-w-0 items-center gap-3 text-start cursor-pointer">
                <span className="font-mono text-[11px] font-bold text-[#B5AC9F]">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate font-bold text-[#17140F]">{heading}</span>
                <ChevronDown className={`ms-auto w-4 h-4 shrink-0 text-[#8F877C] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <button type="button" className={iconBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" title="Move up">
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button type="button" className={iconBtn} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" title="Move down">
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button type="button" className={iconBtn} onClick={() => duplicate(i)} aria-label="Duplicate" title="Duplicate">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button type="button" className={`${iconBtn} hover:!border-red-400 hover:!text-red-600`} onClick={() => remove(i)} aria-label="Delete" title="Delete">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {isOpen && (
              <div className="grid gap-5 border-t border-[#EFEAE2] p-4 md:grid-cols-2 md:p-5">
                {section.fields.map((f) => (
                  <FieldEditor key={f.key} field={f} data={item} onChange={(k, v) => update(i, k, v)} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={add}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#D6CEC2] p-4 text-sm font-bold text-[#5C564E] hover:border-[#F05A1A] hover:text-[#F05A1A] transition cursor-pointer"
      >
        <Plus className="w-4 h-4" /> Add {section.itemLabel}
      </button>
    </div>
  );
}

/* ---------- A single object (Profile & Contact) ---------- */

export function ObjectEditor({ section, data, onChange }: { section: ObjectSection; data: Item; onChange: (data: Item) => void }) {
  return (
    <div className="space-y-5">
      {section.groups.map((g) => (
        <div key={g.title} className="rounded-2xl border border-[#E4DDD2] bg-white/80 p-4 md:p-5">
          <h3 className="mb-4 font-bold text-[#17140F]">{g.title}</h3>
          <div className="grid gap-5 md:grid-cols-2">
            {g.fields.map((f) => (
              <FieldEditor key={f.key} field={f} data={data} onChange={(k, v) => onChange({ ...data, [k]: v })} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Page texts: en.json and ar.json edited side by side ---------- */

type Json = string | string[] | { [k: string]: Json };

const humanize = (key: string) =>
  key
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

function setAt(obj: Json, path: string[], value: Json): Json {
  if (path.length === 0) return value;
  const o = (obj && typeof obj === "object" && !Array.isArray(obj) ? obj : {}) as Record<string, Json>;
  return { ...o, [path[0]]: setAt(o[path[0]], path.slice(1), value) };
}

function getAt(obj: Json | undefined, path: string[]): Json | undefined {
  return path.reduce<Json | undefined>((o, k) => (o && typeof o === "object" && !Array.isArray(o) ? o[k] : undefined), obj);
}

function TextRows({ en, ar, path, onChange }: { en: Json; ar: Json; path: string[]; onChange: (lang: "en" | "ar", path: string[], v: Json) => void }) {
  if (typeof en === "string") {
    const arVal = getAt(ar, path);
    const long = en.length > 60;
    const label = (lang: "en" | "ar") => `${humanize(path[path.length - 1])} (${lang === "ar" ? "Arabic" : "English"})`;
    const box = (v: string, lang: "en" | "ar") =>
      long ? (
        <textarea aria-label={label(lang)} className={inputCls} rows={Math.min(6, Math.ceil(v.length / 60) + 1)} dir={lang === "ar" ? "rtl" : "ltr"} value={v} onChange={(e) => onChange(lang, path, e.target.value)} />
      ) : (
        <input aria-label={label(lang)} className={inputCls} dir={lang === "ar" ? "rtl" : "ltr"} value={v} onChange={(e) => onChange(lang, path, e.target.value)} />
      );
    return (
      <div className="grid gap-2 md:grid-cols-[180px_1fr_1fr] md:items-start">
        <span className="pt-2.5 text-xs font-bold text-[#5C564E]">{humanize(path[path.length - 1])}</span>
        {box(en, "en")}
        {box(typeof arVal === "string" ? arVal : "", "ar")}
      </div>
    );
  }
  if (Array.isArray(en)) {
    const arList = getAt(ar, path);
    return (
      <div className="grid gap-2 md:grid-cols-[180px_1fr_1fr]">
        <span className="pt-2.5 text-xs font-bold text-[#5C564E]">{humanize(path[path.length - 1])}</span>
        <ListInput value={en} onChange={(v) => onChange("en", path, v)} />
        <ListInput value={Array.isArray(arList) ? arList : []} onChange={(v) => onChange("ar", path, v)} rtl />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {Object.entries(en).map(([k, v]) => (
        <TextRows key={k} en={v} ar={ar} path={[...path, k]} onChange={onChange} />
      ))}
    </div>
  );
}

export function MessagesEditor({ en, ar, onChange }: { en: Json; ar: Json; onChange: (en: Json, ar: Json) => void }) {
  const [open, setOpen] = useState<string | null>("hero");
  const groups = en && typeof en === "object" && !Array.isArray(en) ? Object.entries(en) : [];

  const handle = (lang: "en" | "ar", path: string[], v: Json) =>
    lang === "en" ? onChange(setAt(en, path, v), ar) : onChange(en, setAt(ar, path, v));

  return (
    <div className="space-y-3">
      <div className="hidden md:grid grid-cols-[180px_1fr_1fr] gap-2 px-4 text-[11px] font-bold uppercase tracking-wider text-[#8F877C]">
        <span />
        <span>English</span>
        <span className="text-end">العربية</span>
      </div>
      {groups.map(([group, value]) => {
        const isOpen = open === group;
        return (
          <div key={group} className={`rounded-2xl border bg-white/80 ${isOpen ? "border-[#F05A1A]/50" : "border-[#E4DDD2]"}`}>
            <button type="button" onClick={() => setOpen(isOpen ? null : group)} className="flex w-full items-center gap-3 p-4 text-start font-bold text-[#17140F] cursor-pointer">
              {humanize(group)} section
              <ChevronDown className={`ms-auto w-4 h-4 text-[#8F877C] transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="border-t border-[#EFEAE2] p-4 md:p-5">
                <TextRows en={value} ar={ar} path={[group]} onChange={handle} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { Json };
