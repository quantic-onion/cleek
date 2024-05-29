import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "/../src/styles/index.styl";
        `,
      },
    },
  },
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
      },
      name: 'Cleek',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'main.css';
          return assetInfo.name as string;
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
});
