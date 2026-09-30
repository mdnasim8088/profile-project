// Edited from the admin panel (/admin); src/content/services.json is the source of truth.
import data from "@/content/services.json";
import { Service } from "@/types";

export const servicesData = data as Service[];
