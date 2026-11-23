import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The workspace package ships TypeScript source until it gets a build step.
  transpilePackages: ["yaml-to-resume"],
};

export default nextConfig;
