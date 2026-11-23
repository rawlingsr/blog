import { defineConfig } from "tsdown";

// Builds the published files in dist/. Inside this workspace, package.json "exports" point at
// src/ instead; publishConfig.exports swaps in these dist/ paths when the package is packed.
export default defineConfig({
  entry: {
    index: "src/index.ts",
    node: "src/node.ts",
    "react/index": "src/react/index.ts",
  },
  format: "esm",
  // index and react also run in browsers; only node.ts uses Node APIs.
  platform: "neutral",
  // Plain .js / .d.ts, since package.json has "type": "module".
  fixedExtension: false,
  dts: true,
  outDir: "dist",
  clean: true,
  deps: {
    // dependencies and peerDependencies (yaml, react) are left external by default;
    // Node built-ins must be too, because the platform is neutral.
    neverBundle: [/^node:/],
  },
  copy: [{ from: "src/styles.css" }],
});
