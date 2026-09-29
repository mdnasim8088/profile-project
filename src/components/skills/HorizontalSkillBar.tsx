"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Skill } from "@/types";

interface HorizontalSkillBarProps {
  skill: Skill;
  idx: number;
}

export function HorizontalSkillBar({ skill, idx }: HorizontalSkillBarProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="space-y-3 group block">
      <motion.div
        initial={{ opacity: 0, x: isAr ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.08 }}
        className="flex justify-between items-center text-sm"
      >
        <span className="text-[#17140F] font-bold flex items-center gap-2 group-hover:text-[#F05A1A] transition-colors">
          {isAr ? skill.nameAr : skill.name}
          <span className="text-[11px] text-[#8F877C] tracking-wider font-semibold uppercase hidden sm:inline-block">
            ({isAr ? skill.categoryAr : skill.category})
          </span>
        </span>
        <span className="text-[#F05A1A] font-black tracking-widest">{skill.percentage}%</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.08 }}
        className="w-full h-2 bg-[#E4DDD2] rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
          className="h-full bg-[linear-gradient(90deg,#F05A1A_0%,#FF7A3D_100%)] rounded-full"
        />
      </motion.div>
    </section>
  );
}
