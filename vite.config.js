// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis", // ✅ Fix "global is not defined"
  },
  optimizeDeps: {
    include: ["buffer", "process"], // ✅ Helps pre-bundle
  },
});
