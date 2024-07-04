import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "cleek/dist/cleek-styles/clear-app.styl";
          @import "cleek/dist/cleek-styles/cleek-mixins.styl";
          @import "cleek/dist/cleek-styles/tiny-tailwind";
        `,
      },
    },
  },
});
