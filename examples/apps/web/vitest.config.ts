import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.*"],
    exclude: ["node_modules"],
    coverage: {
      provider: "v8",
      reporter: ["json-summary", "json", "text"],
    },
  },
});
