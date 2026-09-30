// Edited from the admin panel (/admin); src/content/experience.json is the source of truth.
import data from "@/content/experience.json";
import { Experience } from "@/types";

export const experienceData = data as Experience[];
