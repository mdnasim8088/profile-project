"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";

export function Testimonials() {
  const locale = useLocale();
  const t = useTranslations("testimonials");
  const isAr = locale === "ar";

  const reviews: Testimonial[] = [
    {
      id: "1",
      name: "Taghareed Company Management",
      nameAr: "إدارة شركة تغاريد",
      role: "Al Hasa, Saudi Arabia",
      roleAr: "الأحساء، المملكة العربية السعودية",
      content:
        "Tusar demonstrates strong attention to detail in print production and machine operation. He works carefully with UV printing, banners, stickers, and production requirements while maintaining accuracy and consistency.",
      contentAr:
        "يُظهر توسار اهتمامًا كبيرًا بالتفاصيل في الإنتاج الطباعي وتشغيل الماكينات. يعمل بدقة في طباعة الأشعة فوق البنفسجية واللافتات والملصقات ومتطلبات الإنتاج مع الحفاظ على الدقة والاتساق.",
      stars: 5,
    },
    {
      id: "2",
      name: "PADEL IT Management",
      nameAr: "إدارة شركة PADEL IT",
      role: "Riyadh, Saudi Arabia",
      roleAr: "الرياض، المملكة العربية السعودية",
      content:
        "Tusar showed strong responsibility in daily operations and supervision. He handled tasks professionally, supported the team, and maintained a positive approach toward customer service and workplace responsibilities.",
      contentAr:
        "أظهر توسار مسؤولية عالية في العمليات اليومية والإشراف. تعامل مع المهام باحترافية ودعم الفريق وحافظ على نهج إيجابي تجاه خدمة العملاء ومسؤوليات العمل.",
      stars: 5,
    },
    {
      id: "3",
      name: "Design King Company",
      nameAr: "إدارة شركة ديزاين كينغ",
      role: "Brahmanbaria, Bangladesh",
      roleAr: "براهمانباريا، بنغلاديش",
      content:
        "Tusar combines creativity with practical design skills. His experience in logo design, branding, marketing materials, and print preparation helped support our day-to-day design work.",
      contentAr:
        "يجمع توسار بين الإبداع والمهارات التصميمية العملية. ساعدت خبرته في تصميم الشعارات والعلامات التجارية والمواد التسويقية وإعداد الطباعة في دعم أعمال التصميم اليومية.",
      stars: 5,
    },
  ];

  return (
    <section className="py-32 bg-[#EFEAE2]/55 border-t border-[#E4DDD2] relative">
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="glass-card corner-marks p-8 flex flex-col justify-between hover:border-[#F05A1A] hover:shadow-[0_12px_30px_rgba(240,90,26,0.12)] transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-1.5">
                  {[...Array(rev.stars)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 text-[#F05A1A] fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#5C564E] leading-relaxed font-medium">
                  &ldquo;{isAr ? rev.contentAr : rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#E4DDD2] flex flex-col">
                <span className="text-base font-bold text-[#17140F] tracking-tight">
                  {isAr ? rev.nameAr : rev.name}
                </span>
                <span className="text-xs font-bold text-[#F05A1A] mt-1">
                  {isAr ? rev.roleAr : rev.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
