import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.test.*"],
    exclude: ["node_modules", "test/smoke"],
    setupFiles: ["test/vitest/setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    coverage: {
      exclude: [
        "build/**",
        "playwright.config.ts",
        "next.config.js",
        "deployment/bin/**",
        ".next/**",
        "playwright-test-results/**",
      ],
      reporter: ["json-summary"],
    },
  },
});
