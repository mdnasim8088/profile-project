"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AccentText } from "@/components/ui/AccentText";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { TimelineItem } from "./TimelineItem";
import { Briefcase, GraduationCap } from "lucide-react";

export function Timeline() {
  const locale = useLocale();
  const t = useTranslations("experience");
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-16 md:py-32 bg-transparent border-t border-[#E4DDD2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-20">
          <span className="bracket-label mb-2">{t("badge")}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17140F] tracking-tight">
            <AccentText text={t("title")} />
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] max-w-xl mt-4 font-medium">
            {t("subtitle")}
          </p>
          <div className="glow-line w-48 mt-4" />

          {/* Toggle buttons */}
          <div className="glass-pill flex flex-wrap justify-center items-center gap-2 p-1.5 mt-6">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "experience"
                  ? "bg-orange-grad text-white shadow-xs"
                  : "text-[#17140F] hover:text-[#F05A1A] hover:bg-[#F05A1A]/10"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t("tabExperience")} ({experienceData.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "education"
                  ? "bg-orange-grad text-white shadow-xs"
                  : "text-[#17140F] hover:text-[#F05A1A] hover:bg-[#F05A1A]/10"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t("tabEducation")} ({educationData.length})</span>
            </button>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="max-w-3xl mx-auto relative ltr:pl-4 md:ltr:pl-6 rtl:pr-4 md:rtl:pr-6">
          {/* Vertical Connecting Line */}
          <div className="absolute top-2 bottom-6 ltr:left-4 md:ltr:left-6 rtl:right-4 md:rtl:right-6 -translate-x-1/2 rtl:translate-x-1/2 w-[2px] bg-gradient-to-b from-[#F05A1A] via-[#E4DDD2] to-transparent" />

          {activeTab === "experience" ? (
            <div className="space-y-4">
              {experienceData.map((exp, idx) => (
                <TimelineItem
                  key={exp.id}
                  title={isAr ? exp.titleAr : exp.title}
                  subtitle={isAr ? exp.companyAr : exp.company}
                  period={isAr ? exp.periodAr : exp.period}
                  location={isAr ? exp.locationAr : exp.location}
                  description={isAr ? exp.descriptionAr : exp.description}
                  type="experience"
                  idx={idx}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <TimelineItem
                  key={edu.id}
                  title={isAr ? edu.degreeAr : edu.degree}
                  subtitle={isAr ? edu.institutionAr : edu.institution}
                  period={isAr ? edu.periodAr : edu.period}
                  description={isAr ? edu.descriptionAr : edu.description}
                  type="education"
                  idx={idx}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
