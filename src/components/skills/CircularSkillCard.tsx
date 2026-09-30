"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Skill } from "@/types";

interface CircularSkillCardProps {
  skill: Skill;
  idx: number;
}

export function CircularSkillCard({ skill, idx }: CircularSkillCardProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4.5rem)/4)] glass-card corner-marks p-4 md:p-6 flex flex-col items-center gap-4 md:gap-5 text-center hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.1)] transition-all duration-300 group cursor-default"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        <svg viewBox="0 0 96 96" className="w-full h-full transform -rotate-90 drop-shadow-xs">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#E4DDD2"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#F05A1A"
            strokeWidth="6"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-lg font-black text-[#17140F] group-hover:text-[#F05A1A] transition-colors">
          {skill.percentage}%
        </span>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-[15px] font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors">
          {isAr ? skill.nameAr : skill.name}
        </h4>
        <span className="inline-block px-3 py-1 rounded-md text-[10px] tracking-wider uppercase font-bold bg-[#F05A1A]/10 text-[#F05A1A] border border-[#F05A1A]/20">
          {isAr ? skill.categoryAr : skill.category}
        </span>
      </div>
    </motion.div>
  );
}
