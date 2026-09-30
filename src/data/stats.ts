// Edited from the admin panel (/admin); src/content/stats.json is the source of truth.
import data from "@/content/stats.json";
import { StatCard } from "@/types";

export const statsData = data as StatCard[];
