import baseConfig from "../../vitest.config.base.js";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    threads: true,
    // https://github.com/vitejs/vite/issues/7879#issuecomment-1349079757
    deps: {
      fallbackCJS: true,
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
