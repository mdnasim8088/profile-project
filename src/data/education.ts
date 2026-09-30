// Edited from the admin panel (/admin); src/content/education.json is the source of truth.
import data from "@/content/education.json";
import { Education } from "@/types";

export const educationData = data as Education[];
