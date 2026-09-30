"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Layers, Mail, Palette, ShieldCheck, Zap } from "lucide-react";
import { fullName, siteData } from "@/data/site";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const socials = [
  {
    label: "Behance",
    href: siteData.behance,
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>,
  },
  {
    label: "LinkedIn",
    href: siteData.linkedin,
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${siteData.whatsapp}`,
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    label: "Email",
    href: `mailto:${siteData.email}`,
    icon: <Mail className="w-4 h-4" strokeWidth={2} />,
  },
];

/** First name in capitals with its second-to-last letter picked out in orange (TUS·A·R). */
function AccentName({ name, accentClass }: { name: string; accentClass: string }) {
  const upper = name.toUpperCase();
  if (upper.length < 3) return <>{upper}</>;
  const i = upper.length - 2;
  return (
    <>
      {upper.slice(0, i)}
      <span className={accentClass}>{upper[i]}</span>
      {upper.slice(i + 1)}
    </>
  );
}

/** Word-by-word slide-up reveal for the display name. */
function RevealName({ words }: { words: React.ReactNode[] }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-1 me-[0.22em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  const nameWords = isAr
    ? [siteData.firstNameAr, siteData.lastNameAr]
    : [<AccentName key="first" name={siteData.firstName} accentClass="text-gradient-orange" />, siteData.lastName.toUpperCase()];

  const badgeText = isAr ? siteData.rotatingTextAr : siteData.rotatingText;

  return (
    <section className="relative pt-32 pb-14 md:min-h-screen md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Top meta strip, like a presentation slide header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-24 left-0 right-0 z-10 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pb-3 relative">
          <span className="bracket-label !text-[10px]">{isAr ? "تصميم وطباعة" : "design & print studio"}</span>
          <span dir="ltr" className="hidden sm:inline font-mono text-[11px] font-bold tracking-[0.2em] whitespace-nowrap text-[#17140F]">
            [ <AccentName name={siteData.firstName} accentClass="text-[#F05A1A]" /> ]
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 inset-x-6 md:inset-x-12 h-px bg-[#E4DDD2] origin-left rtl:origin-right"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20 items-center relative z-10 w-full">
        {/* Left Column: Text & CTAs */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7 flex flex-col">
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#F05A1A] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#F05A1A]" />
            </span>
            <span className="bracket-label">{t("greeting")}</span>
          </motion.div>

          {/* Name & Headline */}
          <div className="flex flex-col mb-8">
            <h1 className="text-[44px] sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-[#17140F] tracking-tight leading-[0.95] mb-5">
              <RevealName words={nameWords} />
            </h1>
            <motion.h2 variants={item} className="text-lg md:text-2xl font-bold text-[#17140F]/80 tracking-tight flex items-center gap-3">
              <span className="w-10 h-[2px] bg-orange-grad shrink-0" />
              {t("title")}
            </motion.h2>
          </div>

          <motion.p variants={item} className="text-base md:text-lg text-[#5C564E] max-w-xl leading-relaxed mb-8 md:mb-10 font-medium">
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-8 md:mb-12">
            <Link
              href={`/${locale}#portfolio`}
              className="btn-shine group inline-flex items-center gap-3 ps-8 pe-2 py-2 rounded-full font-bold text-sm text-white bg-[#17140F] shadow-[0_10px_30px_rgba(23,20,15,0.18)] hover:shadow-[0_14px_36px_rgba(240,90,26,0.3)] transition-shadow duration-300"
            >
              <span>{t("ctaViewWork")}</span>
              <span className="w-10 h-10 rounded-full bg-orange-grad flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-45deg] rtl:group-hover:rotate-[225deg] rtl:rotate-180">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href={`/${locale}#contact`}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm text-[#17140F] bg-white/70 backdrop-blur border border-[#E4DDD2] hover:border-[#F05A1A] hover:text-[#F05A1A] transition-all duration-300"
            >
              <span>{t("ctaContact")}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
                className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/80 backdrop-blur border border-[#E4DDD2] text-[#5C564E] hover:text-white hover:bg-orange-grad hover:border-[#F05A1A] hover:shadow-[0_8px_20px_rgba(240,90,26,0.3)] transition-colors duration-300"
                aria-label={s.label}
              >
                {s.icon}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[#17140F] text-white text-[10px] font-bold tracking-wide opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
                  {s.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-8 mt-8 md:pt-10 md:mt-10 border-t border-[#E4DDD2]">
            {[
              { icon: ShieldCheck, label: t("quality") },
              { icon: Palette, label: t("identity") },
              { icon: Layers, label: t("exp") },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/60 border border-[#E4DDD2]">
                <Icon className="w-4 h-4 text-[#F05A1A]" strokeWidth={2} />
                <span className="text-[13px] font-semibold text-[#5C564E]">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Round Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-first md:order-none lg:col-span-5 flex justify-center lg:justify-end relative items-center pt-4 pb-10 md:py-10"
        >
          <div className="group relative w-[270px] min-[375px]:w-[290px] min-[414px]:w-[310px] max-w-[calc(100%-2rem)] aspect-[4/5] md:max-w-full md:w-[400px]">
            {/* Wireframe boxes with [tags] */}
            <div className="hidden md:block">
              {[
                { cls: "top-[6%] -left-20 w-36 h-28", tag: "top-2 left-2", text: isAr ? "تصميم" : "design", d: 0.9 },
                { cls: "top-[52%] -right-24 lg:-right-12 min-[90rem]:-right-24 w-32 h-36", tag: "bottom-2 right-2", text: isAr ? "طباعة" : "print", d: 1.05 },
                { cls: "-bottom-10 left-[4%] w-44 h-24", tag: "bottom-2 left-2", text: isAr ? "هوية بصرية" : "branding", d: 1.2 },
                { cls: "top-0 right-[2%] w-24 h-20", tag: "top-2 right-2", text: "UV", d: 1.35 },
              ].map((b) => (
                <motion.div
                  key={b.text}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: b.d }}
                  className={`wire-box ${b.cls}`}
                >
                  <span className={`wire-tag ${b.tag}`}>[{b.text}]</span>
                </motion.div>
              ))}
            </div>

            {/* Circle stage: glow, rings, gradient disc, selection handles */}
            <div className="absolute inset-x-0 bottom-0 aspect-square">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(240,90,26,0.3)_0%,rgba(240,90,26,0.08)_45%,transparent_70%)] blur-2xl pointer-events-none"
              />
              <div className="absolute -inset-6 rounded-full border border-dashed border-[#F05A1A]/35 animate-spin-slow [animation-direction:reverse] [animation-duration:60s]" />
              <div className="absolute -inset-2.5 rounded-full ring-comet animate-spin-slow [animation-duration:8s]" />
              <div className="absolute inset-0 rounded-full overflow-hidden bg-[radial-gradient(circle_at_30%_25%,#FFD9C2_0%,#FF9A4D_35%,#F05A1A_70%,#C8360C_100%)] shadow-[0_30px_70px_rgba(240,90,26,0.35)]">
                {[0.45, 0.65, 0.85].map((s) => (
                  <div
                    key={s}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25"
                    style={{ width: `${s * 100}%`, aspectRatio: "1" }}
                  />
                ))}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(23,20,15,0.25))]" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="selection-frame !border-[#17140F]/60 !border"
              >
                <i /><i /><i /><i /><i /><i />
              </motion.div>
            </div>

            {/* Portrait, layer 1: body clipped inside the circle */}
            <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[125%] origin-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={siteData.profileImage}
                  alt={`${fullName(isAr)} - ${t("title")}`}
                  fill
                  sizes="(max-width: 768px) 310px, 400px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Portrait, layer 2: head breaking out above the circle. The mask cuts out the
                circle (overlapping its edge slightly, so no seam) so this layer never paints over
                layer 1. The container must stay 4:5 for the mask to line up with the circle. */}
            <div
              className="absolute inset-0 [clip-path:inset(0_0_62%_0)] [mask-image:radial-gradient(50%_40%_at_50%_60%,transparent_97%,#000_98.5%)] [-webkit-mask-image:radial-gradient(50%_40%_at_50%_60%,transparent_97%,#000_98.5%)] pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute inset-0 origin-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={siteData.profileImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 310px, 400px"
                  className="object-contain object-bottom drop-shadow-[0_-4px_18px_rgba(23,20,15,0.18)]"
                  priority
                />
              </div>
            </div>

            {/* Floating Badge: Expert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 1 }, x: { delay: 1, duration: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 } }}
              className="absolute top-[30%] -right-5 md:top-[27%] md:-right-14 lg:-right-12 min-[90rem]:-right-20 lg:max-xl:scale-[0.85] lg:max-xl:origin-right flex items-center gap-1.5 md:gap-3 px-2 py-1.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-white/90 backdrop-blur-md border border-[#E4DDD2] shadow-[0_12px_30px_rgba(23,20,15,0.12)] z-20"
            >
              <div className="w-6 h-6 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-orange-grad flex items-center justify-center shrink-0 shadow-[0_6px_14px_rgba(240,90,26,0.35)]">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div className="flex flex-col pe-1">
                <span className="text-[8px] md:text-[10px] leading-tight text-[#8F877C] uppercase tracking-wider md:tracking-widest font-bold">
                  {isAr ? siteData.expertLabelAr : siteData.expertLabel}
                </span>
                <span className="text-[11px] md:text-sm leading-tight font-bold text-[#17140F]">
                  {isAr ? siteData.expertTitleAr : siteData.expertTitle}
                </span>
              </div>
            </motion.div>

            {/* Floating Badge: Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
              transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2, duration: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.8 } }}
              className="absolute bottom-[17%] -left-3 md:bottom-[20%] md:-left-20 lg:max-xl:scale-[0.85] lg:max-xl:origin-left flex items-center gap-1.5 md:gap-3 px-2.5 py-1.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl bg-[#17140F] shadow-[0_12px_30px_rgba(23,20,15,0.3)] z-20"
            >
              <span className="font-display text-lg md:text-3xl font-extrabold text-gradient-orange leading-none">{siteData.yearsValue}</span>
              <div className="flex flex-col pe-1">
                <span className="text-[9px] md:text-[11px] font-bold text-white leading-tight whitespace-pre-line">
                  {isAr ? siteData.yearsLabelAr : siteData.yearsLabel}
                </span>
              </div>
            </motion.div>

            {/* Rotating circular text badge */}
            <Link
              href={`/${locale}#contact`}
              aria-label={t("ctaContact")}
              className="group absolute -bottom-5 -right-2 md:-bottom-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 backdrop-blur border border-[#E4DDD2] shadow-[0_12px_30px_rgba(23,20,15,0.12)] z-30 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full spin-badge">
                <defs>
                  <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-[#17140F] text-[7.5px] font-bold">
                  <textPath href="#badge-circle" textLength={230} lengthAdjust="spacing">
                    {badgeText}
                  </textPath>
                </text>
              </svg>
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-grad text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 rtl:-scale-x-100" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href={`/${locale}#about`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#8F877C] hover:text-[#F05A1A] transition-colors z-10"
        aria-label="Scroll down"
      >
        <span className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <span className="w-1 h-2 rounded-full bg-current scroll-cue" />
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
      </motion.a>
    </section>
  );
}
