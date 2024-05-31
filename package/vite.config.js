import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    plugins: [typescript(/*{ plugin options }*/)],
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'cleek',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
