// Edited from the admin panel (/admin); src/content/skills.json is the source of truth.
import data from "@/content/skills.json";
import { Skill } from "@/types";

export const skillsData = data as Skill[];
