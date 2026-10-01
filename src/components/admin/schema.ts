import type { ContentKey } from "@/lib/admin/files";

/**
 * Describes every editable field so the admin panel can render its forms.
 * `bilingual` fields are stored twice: `key` (English) and `key + "Ar"` (Arabic).
 */
export type FieldType = "text" | "textarea" | "number" | "list" | "image" | "select";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  bilingual?: boolean;
  /** For selects: `labelAr` is copied into `syncArKey` when the option is picked. */
  options?: { value: string; label: string; labelAr?: string }[];
  syncArKey?: string;
  min?: number;
  max?: number;
  help?: string;
};

export type CollectionSection = {
  kind: "collection";
  key: ContentKey;
  title: string;
  description: string;
  itemLabel: string;
  /** Field shown as each card's heading. */
  titleKey: string;
  fields: Field[];
};

export type ObjectSection = {
  kind: "object";
  key: ContentKey;
  title: string;
  description: string;
  groups: { title: string; fields: Field[] }[];
};

export type MessagesSection = { kind: "messages"; key: "messages"; title: string; description: string };

export type Section = CollectionSection | ObjectSection | MessagesSection;

const id: Field = { key: "id", label: "ID", type: "text", help: "Short unique code, e.g. taghareed. Filled in automatically if left empty." };

export const SECTIONS: Section[] = [
  {
    kind: "object",
    key: "site",
    title: "Profile & Contact",
    description: "Your name, hero photo, hero badges, phone, email and social links.",
    groups: [
      {
        title: "Name & photo",
        fields: [
          { key: "firstName", label: "First name", type: "text", bilingual: true },
          { key: "lastName", label: "Last name", type: "text", bilingual: true },
          {
            key: "profileImage",
            label: "Hero profile photo",
            type: "image",
            help: "Best as a PNG with a transparent background, person standing at the bottom, about 800×1000 px.",
          },
        ],
      },
      {
        title: "Hero badges",
        fields: [
          { key: "expertLabel", label: "Expert badge — small label", type: "text", bilingual: true },
          { key: "expertTitle", label: "Expert badge — title", type: "text", bilingual: true },
          { key: "yearsValue", label: "Experience badge — number", type: "text", help: "e.g. 6+" },
          { key: "yearsLabel", label: "Experience badge — text", type: "textarea", bilingual: true, help: "Press Enter for a line break." },
          { key: "rotatingText", label: "Rotating circle text", type: "text", bilingual: true, help: "Ends with ' • ' so the circle joins up." },
        ],
      },
      {
        title: "Contact & social",
        fields: [
          { key: "phone", label: "Phone (as shown)", type: "text", help: "e.g. +966 53 893 7618" },
          { key: "whatsapp", label: "WhatsApp number", type: "text", help: "Digits only with country code, e.g. 966538937618" },
          { key: "email", label: "Email", type: "text" },
          { key: "behance", label: "Behance URL", type: "text" },
          { key: "linkedin", label: "LinkedIn URL", type: "text" },
        ],
      },
    ],
  },
  {
    kind: "messages",
    key: "messages",
    title: "Page Texts",
    description: "Every heading, paragraph and button label on the site, in English and Arabic.",
  },
  {
    kind: "collection",
    key: "projects",
    title: "Portfolio Projects",
    description: "Projects in the portfolio grid. Each one also gets its own detail page.",
    itemLabel: "project",
    titleKey: "title",
    fields: [
      { key: "title", label: "Title", type: "text", bilingual: true },
      {
        key: "category",
        label: "Filter category",
        type: "select",
        options: [
          { value: "brand-identity", label: "Brand Identity", labelAr: "الهوية البصرية" },
          { value: "social-media", label: "Social Media", labelAr: "السوشيال ميديا" },
          { value: "print-uv", label: "Print & UV", labelAr: "الطباعة والـ UV" },
          { value: "signage", label: "Signage & Plotter", labelAr: "اللوحات والقص" },
          { value: "laser", label: "Laser Engraving & Cutting", labelAr: "الحفر والقص بالليزر" },
          { value: "web", label: "Website Design & Development", labelAr: "تصميم وتطوير المواقع" },
        ],
        syncArKey: "categoryAr",
      },
      { key: "categoryAr", label: "Category name (Arabic)", type: "text", help: "Filled in automatically when you pick a category. You can still change it." },
      { key: "year", label: "Year", type: "text" },
      { key: "thumbnail", label: "Card image", type: "image", help: "Shown in the portfolio grid (16:10 works best)." },
      { key: "heroImage", label: "Detail page banner", type: "image", help: "Wide image (21:9). Uses the card image if empty." },
      { key: "description", label: "Short description", type: "textarea", bilingual: true },
      { key: "overview", label: "Overview", type: "textarea", bilingual: true },
      { key: "challenge", label: "The challenge", type: "textarea", bilingual: true },
      { key: "concept", label: "Concept & execution", type: "textarea", bilingual: true },
      { key: "tools", label: "Tools used", type: "list" },
      { key: "slug", label: "URL slug", type: "text", help: "Page address: /en/portfolio/<slug>. Made from the title if empty." },
      id,
    ],
  },
  {
    kind: "collection",
    key: "services",
    title: "Services",
    description: "Service cards. The first six numbers (01–06) get their own icons.",
    itemLabel: "service",
    titleKey: "title",
    fields: [
      { key: "number", label: "Number", type: "text", help: "e.g. 07" },
      { key: "title", label: "Title", type: "text", bilingual: true },
      { key: "description", label: "Description", type: "textarea", bilingual: true },
      { key: "features", label: "Features (English)", type: "list" },
      { key: "featuresAr", label: "Features (Arabic)", type: "list" },
      id,
    ],
  },
  {
    kind: "collection",
    key: "experience",
    title: "Work Experience",
    description: "Jobs in the career timeline, newest first.",
    itemLabel: "job",
    titleKey: "title",
    fields: [
      { key: "title", label: "Job title", type: "text", bilingual: true },
      { key: "company", label: "Company", type: "text", bilingual: true },
      { key: "period", label: "Period", type: "text", bilingual: true, help: "e.g. 2025 – Present" },
      { key: "location", label: "Location", type: "text", bilingual: true },
      { key: "description", label: "Description", type: "textarea", bilingual: true },
      id,
    ],
  },
  {
    kind: "collection",
    key: "education",
    title: "Education",
    description: "Degrees and certificates in the Education tab.",
    itemLabel: "education entry",
    titleKey: "degree",
    fields: [
      { key: "degree", label: "Degree / certificate", type: "text", bilingual: true },
      { key: "institution", label: "Institution", type: "text", bilingual: true },
      { key: "period", label: "Period", type: "text", bilingual: true },
      { key: "description", label: "Description", type: "textarea", bilingual: true },
      id,
    ],
  },
  {
    kind: "collection",
    key: "skills",
    title: "Skills",
    description: "Software skills with percentage rings and bars.",
    itemLabel: "skill",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text", bilingual: true },
      { key: "percentage", label: "Level (%)", type: "number", min: 0, max: 100 },
      {
        key: "category",
        label: "Tab",
        type: "select",
        options: [
          { value: "design", label: "Graphic Design", labelAr: "تصميم" },
          { value: "print", label: "Print & Plotter RIP", labelAr: "طباعة وقص" },
          { value: "operator", label: "Print & Plotter RIP (operator)", labelAr: "تشغيل الطباعة والقص" },
          { value: "office", label: "Office Suite", labelAr: "أوفيس" },
        ],
        syncArKey: "categoryAr",
      },
      { key: "categoryAr", label: "Category label (Arabic)", type: "text", help: "Filled in automatically when you pick a tab. You can still change it." },
      id,
    ],
  },
  {
    kind: "collection",
    key: "stats",
    title: "Stats",
    description: "The number cards under the hero.",
    itemLabel: "stat",
    titleKey: "label",
    fields: [
      { key: "value", label: "Number", type: "text" },
      { key: "suffix", label: "Suffix", type: "text", help: "e.g. + (optional)" },
      { key: "label", label: "Label", type: "text", bilingual: true },
      id,
    ],
  },
  {
    kind: "collection",
    key: "testimonials",
    title: "Testimonials",
    description: "Reviews from employers and colleagues.",
    itemLabel: "testimonial",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name / company", type: "text", bilingual: true },
      { key: "role", label: "Role / place", type: "text", bilingual: true },
      { key: "content", label: "Review", type: "textarea", bilingual: true },
      { key: "stars", label: "Stars", type: "number", min: 1, max: 5 },
      id,
    ],
  },
];

/** A blank item for a collection, with every field present. */
export function emptyItem(section: CollectionSection): Record<string, unknown> {
  const item: Record<string, unknown> = {};
  for (const f of section.fields) {
    const blank = f.type === "list" ? [] : f.type === "number" ? (f.max ?? 0) : f.type === "select" ? f.options?.[0]?.value ?? "" : "";
    item[f.key] = blank;
    if (f.bilingual) item[f.key + "Ar"] = blank;
  }
  for (const f of section.fields) {
    if (f.syncArKey) item[f.syncArKey] = f.options?.[0]?.labelAr ?? "";
  }
  return item;
}
