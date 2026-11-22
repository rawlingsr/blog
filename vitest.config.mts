import path from "node:path";
import { defineConfig } from "vitest/config";

// Run tests in a non-UTC zone so code that mixes local time and UTC fails here, not in production.
process.env.TZ = "Pacific/Honolulu";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
  },
});
