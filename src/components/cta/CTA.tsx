"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AccentText } from "@/components/ui/AccentText";

export function CTA() {
  const locale = useLocale();
  const t = useTranslations("cta");

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-10 md:p-16 bg-[#17140F] ink-grid border border-[#F05A1A]/30 shadow-[0_24px_60px_rgba(23,20,15,0.25)] flex flex-col items-center text-center gap-6 overflow-hidden"
        >
          {/* Ember glow, like the lit object in a dark studio shot */}
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-[radial-gradient(ellipse,rgba(240,90,26,0.45)_0%,rgba(240,90,26,0.1)_45%,transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute top-5 inset-x-6 md:inset-x-10 flex items-center justify-between font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-[#A39A8E] pointer-events-none">
            <span>[ tusar ahammad ]</span>
            <span className="hidden sm:inline">[ design · print · brand ]</span>
          </div>

          <div className="relative w-14 h-14 rounded-2xl bg-[#F05A1A]/15 border border-[#F05A1A]/40 flex items-center justify-center text-[#FF7A3D] shadow-xs mt-4">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="relative text-3xl md:text-5xl font-black text-[#F7F4EF] max-w-2xl leading-tight">
            <AccentText text={t("title")} />
          </h2>

          <div className="glow-line w-56" />

          <p className="relative text-sm md:text-base text-[#BDB4A7] max-w-xl leading-relaxed font-medium">
            {t("description")}
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Link
              href={`/${locale}#contact`}
              className="btn-interactive inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white bg-orange-grad hover:brightness-110 transition-all duration-200 shadow-[0_4px_14px_rgba(240,90,26,0.25)] mt-2"
            >
              <span>{t("button")}</span>
              <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
