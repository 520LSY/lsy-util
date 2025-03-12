import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
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
