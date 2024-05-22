import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = env;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: `http://${VITE_SERVER_HOST}:${VITE_SERVER_PORT}`,
          changeOrigin: true,
        },
      },
    },
  };
});
