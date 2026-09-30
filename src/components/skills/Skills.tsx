"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AccentText } from "@/components/ui/AccentText";
import { skillsData } from "@/data/skills";
import { CircularSkillCard } from "./CircularSkillCard";
import { HorizontalSkillBar } from "./HorizontalSkillBar";
import { Sparkles } from "lucide-react";

export function Skills() {
  const t = useTranslations("skills");
  const [activeTab, setActiveTab] = useState<"design" | "print" | "office">("design");

  const filteredSkills = skillsData.filter((skill) => {
    if (activeTab === "design") return skill.category === "design";
    if (activeTab === "print") return skill.category === "print" || skill.category === "operator";
    if (activeTab === "office") return skill.category === "office";
    return true;
  });

  return (
    <section id="skills" className="py-16 md:py-32 bg-[#EFEAE2]/55 border-t border-[#E4DDD2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-20">
          <span className="bracket-label mb-2">{t("badge")}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17140F] tracking-tight">
            <AccentText text={t("title")} />
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] max-w-xl mt-4 font-medium">
            {t("subtitle")}
          </p>
          <div className="glow-line w-48 mt-4" />

          {/* Category Tabs */}
          <div className="glass-pill flex flex-wrap justify-center items-center gap-2 p-1.5 mt-6">
            <button
              onClick={() => setActiveTab("design")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "design"
                  ? "bg-orange-grad text-white shadow-xs"
                  : "text-[#17140F] hover:text-[#F05A1A] hover:bg-[#F05A1A]/10"
              }`}
            >
              {t("tabDesign")}
            </button>
            <button
              onClick={() => setActiveTab("print")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "print"
                  ? "bg-orange-grad text-white shadow-xs"
                  : "text-[#17140F] hover:text-[#F05A1A] hover:bg-[#F05A1A]/10"
              }`}
            >
              {t("tabPrint")}
            </button>
            <button
              onClick={() => setActiveTab("office")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "office"
                  ? "bg-orange-grad text-white shadow-xs"
                  : "text-[#17140F] hover:text-[#F05A1A] hover:bg-[#F05A1A]/10"
              }`}
            >
              {t("tabOffice")}
            </button>
          </div>
        </div>

        {/* Circular Skill Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 md:mb-24">
          {filteredSkills.map((skill, idx) => (
            <CircularSkillCard key={skill.id} skill={skill} idx={idx} />
          ))}
        </div>

        {/* Detailed Horizontal Progress Bars */}
        <div className="glass-panel p-6 md:p-12 max-w-5xl mx-auto space-y-6 md:space-y-8 hover:border-[#F05A1A] transition-colors duration-500">
          <h3 className="text-2xl font-bold text-[#17140F] flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#F05A1A]" />
            <span>{t("distributionTitle")}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 pt-4 border-t border-[#E4DDD2]">
            {skillsData.map((skill, idx) => (
              <HorizontalSkillBar key={skill.id} skill={skill} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
