import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "packages/*/dist/**"]
}, {
  // Workspace packages are framework-neutral: plain <img> and <a> are correct there, not next/image or next/link.
  files: ["packages/**"],
  rules: {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
}];

export default eslintConfig;
