import path from "node:path";
import { defineConfig } from "vitest/config";

// Run tests in a non-UTC zone so code that mixes local time and UTC fails here, not in production.
process.env.TZ = "Pacific/Honolulu";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    projects: [
      // The site's own tests, using this file's alias and settings.
      { extends: true, test: { name: "site", include: ["test/**/*.test.ts"] } },
      // Each workspace package brings its own vitest.config.mts.
      "packages/*",
    ],
  },
});
