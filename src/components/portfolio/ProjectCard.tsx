"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { ExternalLink, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  idx: number;
}

export function ProjectCard({ project, idx }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations("portfolio");
  const isAr = locale === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#FFFFFF] rounded-[20px] border border-[#E4DDD2] hover:border-[#F05A1A] hover:shadow-[0_12px_30px_rgba(240,90,26,0.12)] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs"
    >
      {/* Project Card Header Image Simulation */}
      <div className="relative aspect-[16/10] w-full bg-[#EFEAE2] overflow-hidden flex items-center justify-center border-b border-[#E4DDD2]">
        <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#E4DDD2] flex items-center justify-center text-[#8F877C] group-hover:scale-105 group-hover:text-[#F05A1A] group-hover:border-[#F05A1A] transition-all duration-500 shadow-xs">
          <Layers className="w-8 h-8" />
        </div>
        <span className="absolute top-4 ltr:right-4 rtl:left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-orange-grad text-white shadow-xs">
          {isAr ? project.categoryAr : project.category}
        </span>
      </div>

      {/* Project Content Body */}
      <div className="p-6 flex flex-col justify-between flex-grow gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#8F877C] uppercase tracking-wider">
            {project.year}
          </span>
          <h3 className="text-xl font-bold text-[#17140F] mt-1 group-hover:text-[#F05A1A] transition-colors">
            {isAr ? project.titleAr : project.title}
          </h3>
          <p className="text-xs md:text-sm text-[#5C564E] mt-2 line-clamp-2 leading-relaxed font-medium">
            {isAr ? project.descriptionAr : project.description}
          </p>
        </div>

        {/* Tools badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tools.map((tool, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#F7F4EF] text-[#5C564E] border border-[#E4DDD2]"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Action Link */}
        <Link
          href={`/${locale}/portfolio/${project.slug}`}
          className="mt-2 pt-4 border-t border-[#E4DDD2] flex items-center justify-between text-xs font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors"
        >
          <span>{t("viewDetails")}</span>
          <ExternalLink className="w-4 h-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </motion.div>
  );
}
