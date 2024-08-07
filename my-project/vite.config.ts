import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 基础路径配置
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
    },
  },
  server: {
    host: true,
  },
});
