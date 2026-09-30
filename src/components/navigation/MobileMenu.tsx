"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations("nav");

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#portfolio`, label: t("portfolio") },
    { href: `/${locale}#experience`, label: t("experience") },
    { href: `/${locale}#services`, label: t("services") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  // Close the open menu on Escape or a tap anywhere outside it
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#17140F] hover:text-[#F05A1A] transition-colors focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="w-6 h-6 text-[#F05A1A]" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#F7F4EF]/95 backdrop-blur-xl border-b border-[#E4DDD2] p-6 shadow-xl flex flex-col gap-5 z-50"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-[#17140F] hover:text-[#F05A1A] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E4DDD2] flex justify-between items-center">
              <span className="text-xs font-semibold text-[#8F877C]">{t("language")}</span>
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
