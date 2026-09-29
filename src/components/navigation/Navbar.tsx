"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { BrandBadge } from "@/components/ui/BrandBadge";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const locale = useLocale();
  const t = useTranslations("nav");
  const isAr = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#portfolio`, label: t("portfolio") },
    { href: `/${locale}#experience`, label: t("experience") },
    { href: `/${locale}#services`, label: t("services") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F4EF]/95 backdrop-blur-xl border-b border-[#E4DDD2] py-4 shadow-sm"
          : "bg-[#F7F4EF]/80 backdrop-blur-md border-b border-[#E4DDD2]/60 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <BrandBadge className="w-10 h-10" />
          <span className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-[15px] tracking-tight text-[#17140F] group-hover:text-[#F05A1A] transition-colors">
              {isAr ? "توسار" : "Tusar"}
              <span className="text-[#F05A1A]">.</span>
            </span>
            <span className="mt-1 font-mono text-[9.5px] font-semibold tracking-[0.28em] uppercase text-[#8F877C] rtl:tracking-normal">
              {isAr ? "أحمد" : "Ahammad"}
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-[#5C564E] hover:text-[#F05A1A] transition-colors relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 ltr:left-0 rtl:right-0 w-0 h-[2px] bg-[#F05A1A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Section: Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <MobileMenu />
        </div>
      </div>

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-orange-grad origin-left rtl:origin-right"
      />
    </header>
  );
}
