import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    setupFiles: [],
  },
});
