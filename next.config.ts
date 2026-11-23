import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // yaml-to-resume is installed from GitHub as TypeScript source (no build step), so Next compiles it.
  transpilePackages: ["yaml-to-resume"],
};

export default nextConfig;
