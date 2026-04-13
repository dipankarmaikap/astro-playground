// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar:{
    enabled:false
  },
  integrations: [react(), vue(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
