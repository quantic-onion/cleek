import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // __cleek__: fileURLToPath(new URL('./node_modules/cleek/dist', import.meta.url)),
    //   __cleek__: fileURLToPath(new URL('../package/dist/cleek.es.js', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "/../src/styles/variables";
          @import "/../src/styles/main";
          @import '/cleek/dist/cleek-styles/clear-app';
          @import '/cleek/dist/cleek-styles/cleek-mixins';
          @import '/cleek/dist/cleek-styles/tiny-tailwind';
        `,
      },
    },
  },
})
