import type { NextConfig } from "next";

// Static export for GitHub Pages (project site: /divinity-ui base path).
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/divinity-ui",
  images: { unoptimized: true },
  reactStrictMode: false,
};

export default nextConfig;
