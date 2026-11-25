import type { NextConfig } from "next";

// Sent with every page. The CSP has no script-src on purpose: Next's inline RSC scripts would need a
// per-request nonce, and nonces force dynamic rendering, which this static site doesn't want. These
// directives still block framing, plugins, <base> hijacking, and forms posting elsewhere.
// No HSTS here: Vercel already sends it for HTTPS domains, and setting it in the app would also apply to
// `next start` on localhost.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Older browsers that don't support frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  // yaml-to-resume is installed from GitHub as TypeScript source (no build step), so Next compiles it.
  transpilePackages: ["yaml-to-resume"],
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
