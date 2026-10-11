import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback; next/image negotiates per browser
    formats: ["image/avif", "image/webp"],
    // 45 is for photos shown heavily dimmed (FinalCta background)
    qualities: [45, 75],
  },
};

export default nextConfig;
