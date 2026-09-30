import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Dev-only status indicator overlaps the hero on small screens — hide it so
  // mobile previews show the real design (errors still show in the terminal).
  devIndicators: false,
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
