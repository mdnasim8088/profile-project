"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AccentText } from "@/components/ui/AccentText";
import { projectsData } from "@/data/projects";
import { CategoryFilter } from "./CategoryFilter";
import { ProjectCard } from "./ProjectCard";
import { FolderKanban } from "lucide-react";

export function Portfolio() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: t("all") },
    { id: "brand-identity", label: t("brandIdentity") },
    { id: "social-media", label: t("socialMedia") },
    { id: "print-uv", label: t("printUv") },
    { id: "signage", label: t("signage") },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 bg-transparent border-t border-[#E4DDD2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="bracket-label mb-2">{t("badge")}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17140F] tracking-tight">
            <AccentText text={t("title")} />
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] max-w-xl mt-4 font-medium">
            {t("subtitle")}
          </p>
          <div className="glow-line w-48 mt-4" />
        </div>

        {/* Filter Tabs */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
