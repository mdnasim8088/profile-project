// Edited from the admin panel (/admin); src/content/projects.json is the source of truth.
import data from "@/content/projects.json";
import { Project } from "@/types";

export const projectsData = data as Project[];
