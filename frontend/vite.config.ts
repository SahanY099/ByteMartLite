import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routeFileIgnorePrefix: "-",
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: "geist-sans",
            src: "./src/assets/fonts/sans/*.woff2",
          },
          {
            name: "geist-mono",
            src: "./src/assets/fonts/mono/*.woff2",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
