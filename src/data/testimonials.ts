// Edited from the admin panel (/admin); src/content/testimonials.json is the source of truth.
import data from "@/content/testimonials.json";
import { Testimonial } from "@/types";

export const testimonialsData = data as Testimonial[];
