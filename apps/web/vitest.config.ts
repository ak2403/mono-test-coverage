import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.test.*"],
    exclude: ["node_modules", "test/smoke"],
    coverage: {
      reporter: ["json-summary"],
    },
  },
});
