import { BrandMark } from "./BrandMark";

type Props = {
  className?: string;
  /** "light" for paper backgrounds, "dark" for ink backgrounds */
  tone?: "light" | "dark";
};

/* The TA monogram dressed in the same motion as the hero portrait:
   breathing ember glow, counter-spinning dashed ring, comet-tail ring. */
export function BrandBadge({ className = "", tone = "light" }: Props) {
  const disc =
    tone === "dark"
      ? "bg-[#221E19] border-[#332D26]"
      : "bg-white/80 border-[#E4DDD2] shadow-[0_6px_16px_-6px_rgba(240,90,26,0.35)]";

  return (
    <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <span className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(240,90,26,0.35)_0%,rgba(240,90,26,0.08)_45%,transparent_70%)] blur-md animate-pulse-glow pointer-events-none" />
      <span className="absolute -inset-1.5 rounded-full border border-dashed border-[#F05A1A]/45 animate-spin-slow [animation-direction:reverse] [animation-duration:30s]" />
      <span className="absolute inset-0 rounded-full ring-comet animate-spin-slow [animation-duration:6s] [--ring-w:2px]" />
      <span className={`absolute inset-[3px] rounded-full border ${disc}`} />
      <BrandMark
        tone={tone}
        ring={false}
        className="relative w-[64%] h-[64%] transition-transform duration-500 group-hover:scale-110"
      />
    </span>
  );
}
