import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: path.resolve(projectRoot, "client/public"),
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client/src"),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
  },
});
