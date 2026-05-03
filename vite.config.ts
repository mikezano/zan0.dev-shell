import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const navbarUrl = env.ZAN0DEV_NAVBAR_URL
    ? `${env.ZAN0DEV_NAVBAR_URL}/mf-manifest.json`
    : "http://localhost:3001/mf-manifest.json";

  const michaelmanzanoUrl = env.ZAN0DEV_MICHAELMANZANO_URL
    ? `${env.ZAN0DEV_MICHAELMANZANO_URL}/mf-manifest.json`
    : "http://localhost:3002/mf-manifest.json";

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        remotes: {
          navbar: {
            type: "module",
            name: "navbar",
            entry: navbarUrl,
          },
          michaelmanzano: {
            type: "module",
            name: "michaelmanzano",
            entry: michaelmanzanoUrl,
          },
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
          "react-router-dom": { singleton: true, requiredVersion: "^7.0.0" },
        },
      }),
    ],
    server: {
      port: 3000,
      strictPort: true,
    },
  };
});
