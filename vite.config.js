import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import ViteRails from "vite-plugin-rails";

export default defineConfig({
  plugins: [ViteRails(), react(), splitVendorChunkPlugin()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    testMatch: ["./app/frontend/**/*.test.jsx"],
    globals: true,
  },
});
