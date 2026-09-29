"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";
import { servicesData } from "@/data/services";
import { Palette, Share2, Image as ImageIcon, Printer, Package, FileCode2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Services() {
  const locale = useLocale();
  const t = useTranslations("services");
  const isAr = locale === "ar";

  const iconMap: Record<string, React.ReactNode> = {
    "01": <Palette className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
    "02": <Share2 className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
    "03": <ImageIcon className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
    "04": <Printer className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
    "05": <Package className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
    "06": <FileCode2 className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />,
  };

  return (
    <section id="services" className="py-32 bg-[#EFEAE2]/55 border-t border-[#E4DDD2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="bracket-label mb-2">{t("badge")}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17140F] tracking-tight">
            <AccentText text={t("title")} />
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] max-w-xl mt-4 font-medium">
            {t("subtitle")}
          </p>
          <div className="glow-line w-48 mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, idx) => {
            const features = isAr ? service.featuresAr : service.features;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="glass-card corner-marks p-8 flex flex-col justify-between hover:border-[#F05A1A] hover:shadow-[0_12px_30px_rgba(240,90,26,0.12)] transition-all duration-300 group relative"
              >
                {/* Top Accent & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-[18px] bg-[#F05A1A]/10 border border-[#F05A1A]/20 group-hover:bg-orange-grad transition-colors">
                      {iconMap[service.number] || <Palette className="w-7 h-7 text-[#F05A1A] group-hover:text-white transition-colors" />}
                    </div>
                    <span className="num-box">{service.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#17140F] mb-4 group-hover:text-[#F05A1A] transition-colors">
                    {isAr ? service.titleAr : service.title}
                  </h3>

                  <p className="text-sm text-[#5C564E] leading-relaxed mb-8 font-medium">
                    {isAr ? service.descriptionAr : service.description}
                  </p>
                </div>

                {/* Service Features Tag List */}
                <div className="pt-6 border-t border-[#E4DDD2] flex flex-wrap gap-2">
                  {features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="glass-chip px-3 py-1.5 rounded-lg text-[11px] font-bold text-[#5C564E]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* CTA Link */}
                <Link
                  href={`/${locale}#contact`}
                  className="mt-8 flex items-center gap-2 text-[13px] font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors w-fit"
                >
                  <span>{t("requestService")}</span>
                  <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
