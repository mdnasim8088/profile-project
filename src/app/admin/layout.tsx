import type { Metadata } from "next";
import { sora, manrope, jetbrainsMono } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Admin · Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [sora, manrope, jetbrainsMono].map((f) => f.variable).join(" ");
  return (
    <html lang="en" dir="ltr" translate="no" className={fontVars}>
      <body className="bg-[#F7F4EF] text-[#17140F] antialiased">{children}</body>
    </html>
  );
}
