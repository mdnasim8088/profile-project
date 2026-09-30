/**
 * The content files the admin panel may read and write, relative to the repo root.
 * Shared by the API (as an allowlist) and the admin UI (to know what to load).
 */
export const CONTENT_FILES = {
  site: "src/content/site.json",
  stats: "src/content/stats.json",
  skills: "src/content/skills.json",
  experience: "src/content/experience.json",
  education: "src/content/education.json",
  services: "src/content/services.json",
  projects: "src/content/projects.json",
  testimonials: "src/content/testimonials.json",
  messagesEn: "src/i18n/messages/en.json",
  messagesAr: "src/i18n/messages/ar.json",
} as const;

export type ContentKey = keyof typeof CONTENT_FILES;
export type ContentBundle = Record<ContentKey, unknown>;

/** Uploaded images are committed here and served from /images/uploads/... */
export const UPLOAD_DIR = "public/images/uploads";
export const UPLOAD_URL_PREFIX = "/images/uploads/";

/** Largest image the API accepts (after the browser has already resized it). */
export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
export const UPLOAD_EXTENSIONS = ["png", "jpg", "jpeg", "webp"] as const;
