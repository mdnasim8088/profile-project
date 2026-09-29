export interface StatCard {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  labelAr: string;
}

export interface Skill {
  id: string;
  name: string;
  nameAr: string;
  category: "design" | "print" | "operator" | "office";
  categoryAr: string;
  percentage: number;
}

export interface Experience {
  id: string;
  title: string;
  titleAr: string;
  company: string;
  companyAr: string;
  period: string;
  periodAr: string;
  location: string;
  locationAr: string;
  description: string;
  descriptionAr: string;
}

export interface Education {
  id: string;
  degree: string;
  degreeAr: string;
  institution: string;
  institutionAr: string;
  period: string;
  periodAr: string;
  description: string;
  descriptionAr: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  content: string;
  contentAr: string;
  stars: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  year: string;
  thumbnail: string;
  heroImage: string;
  description: string;
  descriptionAr: string;
  overview: string;
  overviewAr: string;
  challenge: string;
  challengeAr: string;
  concept: string;
  conceptAr: string;
  tools: string[];
}
