"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AccentText } from "@/components/ui/AccentText";
import { Star } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export function Testimonials() {
  const locale = useLocale();
  const t = useTranslations("testimonials");
  const isAr = locale === "ar";

  const reviews = testimonialsData;
  const count = reviews.length;

  // Cards visible at once: 1 on phones, 2 on tablets, 3 on desktop
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  // The first cards are repeated at the end so the loop never jumps backwards
  const slides = count > 1 ? [...reviews, ...reviews.slice(0, Math.min(perView, count))] : reviews;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => (i >= count ? i : i + 1));
  }, [count]);

  const prev = () => {
    if (index === 0) {
      // Jump (without animation) to the copy at the end, then slide back one
      setAnimate(false);
      setIndex(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(count - 1);
        }),
      );
    } else {
      setAnimate(true);
      setIndex(index - 1);
    }
  };

  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
  };

  // Auto-slide every 4 seconds (paused while hovered/touched or the tab is hidden)
  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => {
      if (!document.hidden) next();
    }, 4000);
    return () => clearInterval(id);
  }, [count, paused, next]);

  // After sliding onto the copied cards, snap back to the real first card
  const onTransitionEnd = () => {
    if (index >= count) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    setPaused(false);
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (dx < -40) next();
    else if (dx > 40) prev();
  };

  return (
    <section className="py-16 md:py-32 bg-[#EFEAE2]/55 border-t border-[#E4DDD2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
        </div>

        {/* Reviews carousel — slides right to left on its own */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          dir="ltr"
          className="overflow-hidden -mx-2.5 md:-mx-3 lg:-mx-4 py-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${(index * 100) / perView}%)`,
              transition: animate ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {slides.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="shrink-0 px-2.5 md:px-3 lg:px-4"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={idx < index || idx >= index + perView}
              >
                <div
                  dir={isAr ? "rtl" : "ltr"}
                  className="glass-card corner-marks h-full p-6 md:p-8 flex flex-col justify-between hover:border-[#F05A1A] hover:shadow-[0_12px_30px_rgba(240,90,26,0.12)] transition-all duration-300"
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

                  <div className="pt-6 mt-6 md:pt-8 md:mt-8 border-t border-[#E4DDD2] flex flex-col">
                    <span className="text-base font-bold text-[#17140F] tracking-tight">
                      {isAr ? rev.nameAr : rev.name}
                    </span>
                    <span className="text-xs font-bold text-[#F05A1A] mt-1">
                      {isAr ? rev.roleAr : rev.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8" dir="ltr">
            {reviews.map((rev, i) => {
              const active = index % count === i;
              return (
                <button
                  key={rev.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${active ? "w-6 bg-[#F05A1A]" : "w-2 bg-[#D6CEC2] hover:bg-[#F05A1A]/50"}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
