import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'cleek',
    },
  },
});
