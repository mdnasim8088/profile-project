"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    
    // Replace current locale prefix in pathname
    let newPathname = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPathname = `/${nextLocale}${pathname}`;
    }

    // Save preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred_locale", nextLocale);
    }

    router.push(newPathname);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFFFFF] text-[#F05A1A] border border-[#F05A1A]/40 hover:bg-orange-grad/10 hover:text-[#FF7A3D] transition-all duration-200 shadow-sm cursor-pointer"
      title={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="w-3.5 h-3.5 text-current" />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </motion.button>
  );
}
