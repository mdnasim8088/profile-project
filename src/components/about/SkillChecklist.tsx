"use client";

import { CheckCircle2 } from "lucide-react";

interface SkillChecklistProps {
  items: string[];
}

export function SkillChecklist({ items }: SkillChecklistProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2.5 text-sm text-[#17140F] hover:text-[#F05A1A] font-medium transition-colors">
          <CheckCircle2 className="w-4 h-4 text-[#F05A1A] shrink-0" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
