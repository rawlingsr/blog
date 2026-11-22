import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The workspace package ships TypeScript source until it gets a build step.
  transpilePackages: ["resume-from-yaml"],
};

export default nextConfig;
