import { defineConfig } from "vitest/config";

// Run tests in a non-UTC zone so code that mixes local time and UTC fails here, not in production.
process.env.TZ = "Pacific/Honolulu";

export default defineConfig({
  test: {
    name: "resume-from-yaml",
    include: ["test/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
