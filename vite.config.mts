/// <reference types="vitest/config" />
import dotenv from "dotenv";
dotenv.config({ override: true, quiet: true });
import { UserConfig, defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import packageJSON from "./package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config: UserConfig = {
  root: "./src",
  envDir: "../",
  plugins: [react()],

  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      server: path.resolve(__dirname, "./src/server"),
      typings: path.resolve(__dirname, "./src/typings"),
      utils: path.resolve(__dirname, "./src/utils"),
      styles: path.resolve(__dirname, "./src/styles"),
    },
  },

  // Server config for local dev only — in production nginx serves the front end
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:9501/",
        changeOrigin: true,
        ws: true,
      },
    },
    watch: {
      ignored: ["**/node_modules/**", "**/.local/**", "**/public/**", "**/static/**"],
    },
    host: "0.0.0.0",
    port: 9500,
    strictPort: true,
  },

  build: {
    outDir: "../.local/vite/dist",
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    rolldownOptions: {
      output: {
        // Creates separate bundles so there isn't one huge bundle.js file
        codeSplitting: {
          groups: [
            {
              name: "react",
              test: /node_modules\/(react|react-dom|react-router|react-router-dom)\//,
            },
          ],
        },
      },
    },
  },

  define: {
    __APP_VERSION__: JSON.stringify(packageJSON.version),
    __GIT_COMMIT__: JSON.stringify(process.env.GIT_COMMIT || "localDev"),
  },
};

export default defineConfig(config);
