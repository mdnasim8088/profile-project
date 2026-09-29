"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { statsData } from "@/data/stats";
import { Briefcase, Building, Globe, FolderCheck } from "lucide-react";

export function Stats() {
  const locale = useLocale();
  const t = useTranslations("stats");
  const isAr = locale === "ar";

  const icons = [
    <Briefcase key="exp" className="w-5 h-5 text-[#F05A1A] group-hover:text-white transition-colors" />,
    <Building key="comp" className="w-5 h-5 text-[#F05A1A] group-hover:text-white transition-colors" />,
    <Globe key="country" className="w-5 h-5 text-[#F05A1A] group-hover:text-white transition-colors" />,
    <FolderCheck key="proj" className="w-5 h-5 text-[#F05A1A] group-hover:text-white transition-colors" />,
  ];

  return (
    <section className="py-16 bg-[#EFEAE2]/55 border-y border-[#E4DDD2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E4DDD2] flex flex-col gap-3 hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.08)] transition-all duration-300 group cursor-default shadow-xs"
            >
              <div className="p-3 rounded-xl bg-[#F05A1A]/10 w-fit group-hover:bg-orange-grad transition-colors">
                {icons[idx % icons.length]}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl md:text-4xl font-extrabold text-[#17140F] tracking-tight group-hover:text-[#F05A1A] transition-colors">
                  {stat.value}
                </span>
                <span className="text-xl font-bold text-[#F05A1A]">{stat.suffix}</span>
              </div>

              <p className="text-xs md:text-sm font-semibold text-[#5C564E] group-hover:text-[#17140F] transition-colors">
                {isAr ? stat.labelAr : stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
