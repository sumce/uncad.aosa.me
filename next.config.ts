import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export (all pages are prerendered) — deployed as static
  // assets on Alibaba Cloud ESA Pages.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
