"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";
import { SkillChecklist } from "./SkillChecklist";
import { Award, CheckCircle, Monitor, Printer } from "lucide-react";

export function About() {
  const t = useTranslations("about");

  const skillsList = [
    t("skills.item1"),
    t("skills.item2"),
    t("skills.item3"),
    t("skills.item4"),
    t("skills.item5"),
    t("skills.item6"),
    t("skills.item7"),
    t("skills.item8"),
    t("skills.item9"),
    t("skills.item10"),
    t("skills.item11"),
    t("skills.item12"),
    t("skills.item13"),
    t("skills.item14"),
    t("skills.item15"),
  ];

  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#EFEAE2] rounded-3xl p-8 md:p-12 border border-[#E4DDD2] relative overflow-hidden shadow-xs hover:border-[#F05A1A]/50 transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Information */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="bracket-label">{t("badge")}</span>

              <h2 className="text-3xl md:text-5xl font-black text-[#17140F] leading-tight">
                <AccentText text={t("headline")} />
              </h2>

              <p className="text-base text-[#5C564E] leading-relaxed font-medium">
                {t("bio")}
              </p>

              <div className="pt-2">
                <h3 className="text-lg font-bold text-[#17140F] mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F05A1A]" />
                  <span>{t("competenciesTitle")}</span>
                </h3>
                <SkillChecklist items={skillsList} />
              </div>
            </div>

            {/* Right Column: Visual Feature Cards */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DDD2] flex items-start gap-4 hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.08)] transition-all duration-300 shadow-xs"
              >
                <div className="p-3.5 rounded-xl bg-[#F05A1A]/10 text-[#F05A1A] shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#17140F]">{t("card1Title")}</h4>
                  <p className="text-xs text-[#5C564E] mt-1 leading-relaxed font-medium">
                    {t("card1Desc")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DDD2] flex items-start gap-4 hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.08)] transition-all duration-300 shadow-xs"
              >
                <div className="p-3.5 rounded-xl bg-[#F05A1A]/10 text-[#F05A1A] shrink-0">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#17140F]">{t("card2Title")}</h4>
                  <p className="text-xs text-[#5C564E] mt-1 leading-relaxed font-medium">
                    {t("card2Desc")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DDD2] flex items-start gap-4 hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.08)] transition-all duration-300 shadow-xs"
              >
                <div className="p-3.5 rounded-xl bg-[#F05A1A]/10 text-[#F05A1A] shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#17140F]">{t("card3Title")}</h4>
                  <p className="text-xs text-[#5C564E] mt-1 leading-relaxed font-medium">
                    {t("card3Desc")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
