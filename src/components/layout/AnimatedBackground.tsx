"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Printer's registration target, drawn in the current text color. */
function RegistrationMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="22" cy="22" r="11" />
      <circle cx="22" cy="22" r="5" />
      <path d="M22 0v44M0 22h44" />
    </svg>
  );
}

/** L-shaped crop mark, rotated per corner. */
function CropMark({ className }: { className: string }) {
  return (
    <svg className={`absolute w-8 h-8 text-[#17140F]/15 ${className}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 10h10V0" />
    </svg>
  );
}

const blobs = [
  { className: "top-[-12%] right-[-6%] w-[46rem] h-[46rem] bg-[#F05A1A]/[0.10]", x: [0, -60, 30, 0], y: [0, 50, -30, 0], duration: 26 },
  { className: "bottom-[-18%] left-[-10%] w-[40rem] h-[40rem] bg-[#FFB38A]/[0.22]", x: [0, 70, -20, 0], y: [0, -40, 30, 0], duration: 32 },
  { className: "top-[35%] left-[35%] w-[30rem] h-[30rem] bg-[#E9D8C2]/[0.45]", x: [0, -50, 40, 0], y: [0, 30, -50, 0], duration: 38 },
];

const marks = [
  { className: "top-[22%] left-[6%]", size: 40, duration: 70 },
  { className: "top-[64%] right-[5%]", size: 52, duration: 90 },
  { className: "bottom-[8%] left-[44%]", size: 32, duration: 60 },
];

export function AnimatedBackground() {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#F7F4EF]" aria-hidden="true">
      {/* Drifting aurora of warm tones */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${b.className}`}
          animate={reduce ? undefined : { x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Blueprint grid, slowly sliding */}
      <div className="absolute inset-0 bg-grid-drift [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,#000_40%,transparent_100%)]" />

      {/* Cursor-following ember spotlight */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(240,90,26,0.10)_0%,transparent_65%)]"
        style={{ x: spotX, y: spotY }}
      />

      {/* Print registration marks, slowly rotating */}
      {marks.map((m, i) => (
        <motion.div
          key={i}
          className={`absolute text-[#F05A1A]/25 ${m.className}`}
          animate={reduce ? undefined : { rotate: 360, y: [0, -14, 0] }}
          transition={{
            rotate: { duration: m.duration, repeat: Infinity, ease: "linear" },
            y: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <RegistrationMark size={m.size} />
        </motion.div>
      ))}

      {/* CMYK colour bar, as printed on a proof sheet */}
      <div className="absolute bottom-6 right-6 hidden md:flex gap-1 opacity-40">
        {["#00AEEF", "#EC008C", "#FFF200", "#17140F"].map((c, i) => (
          <motion.span
            key={c}
            className="w-3 h-3"
            style={{ background: c }}
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Crop marks framing the viewport */}
      <CropMark className="top-24 left-4" />
      <CropMark className="top-24 right-4 rotate-90" />
      <CropMark className="bottom-4 right-4 rotate-180" />
      <CropMark className="bottom-4 left-4 -rotate-90" />

      {/* Paper grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.035] mix-blend-multiply" />
    </div>
  );
}
