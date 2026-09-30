// Edited from the admin panel (/admin); src/content/site.json is the source of truth.
import data from "@/content/site.json";
import { SiteContent } from "@/types";

export const siteData = data as SiteContent;

/** Full display name for the given locale, e.g. "Tusar Ahammad". */
export function fullName(isAr: boolean) {
  return isAr ? `${siteData.firstNameAr} ${siteData.lastNameAr}` : `${siteData.firstName} ${siteData.lastName}`;
}
