"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { MapPin, Calendar, Building2, GraduationCap } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  description: string;
  type: "experience" | "education";
  idx: number;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  location,
  description,
  type,
  idx,
}: TimelineItemProps) {
  // Nudge the card away from the timeline line, which sits on the right in Arabic
  const nudge = useLocale() === "ar" ? -4 : 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative ltr:pl-8 md:ltr:pl-12 rtl:pr-8 md:rtl:pr-12 pb-12 last:pb-0 group"
    >
      {/* Premium Marker: Dark Center + Orange Border */}
      <div className="absolute top-2 ltr:left-0 rtl:right-0 -translate-x-[5px] rtl:translate-x-[5px] w-[12px] h-[12px] rounded-full bg-[#FFFFFF] border-2 border-[#F05A1A] group-hover:bg-orange-grad group-hover:scale-125 transition-all duration-300 z-10 shadow-xs" />

      {/* Content Card */}
      <motion.div
        whileHover={{ x: nudge }}
        transition={{ duration: 0.2 }}
        className="glass-card corner-marks p-6 md:p-8 group-hover:border-[#F05A1A] transition-all duration-300 relative overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold tracking-wider bg-[#F05A1A]/10 text-[#F05A1A] border border-[#F05A1A]/20 uppercase">
            <Calendar className="w-3 h-3" />
            <span>{period}</span>
          </span>

          {location && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8F877C] uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-[#F05A1A]" />
              <span>{location}</span>
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm font-semibold text-[#5C564E] mb-4">
          {type === "experience" ? (
            <Building2 className="w-4 h-4 text-[#F05A1A]" />
          ) : (
            <GraduationCap className="w-4 h-4 text-[#F05A1A]" />
          )}
          <span>{subtitle}</span>
        </div>

        <p className="text-sm text-[#5C564E] leading-relaxed max-w-2xl font-medium">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
