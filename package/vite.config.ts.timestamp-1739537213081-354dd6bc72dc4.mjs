// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/Licha/Desktop/CODING/cleek/package/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Licha/Desktop/CODING/cleek/package/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///C:/Users/Licha/Desktop/CODING/cleek/package/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": resolve("src")
    }
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "/../src/styles/index.styl";
        `
      }
    }
  },
  build: {
    lib: {
      entry: {
        main: resolve("src/main.ts")
      },
      name: "Cleek",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["cjs", "es"]
    },
    rollupOptions: {
      external: ["vue", "pinia"],
      output: {
        globals: {
          vue: "Vue"
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css")
            return "main.css";
          return assetInfo.name;
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: "src",
      tsconfigPath: "./tsconfig.json",
      outDir: "dist/types",
      insertTypesEntry: true
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMaWNoYVxcXFxEZXNrdG9wXFxcXENPRElOR1xcXFxjbGVla1xcXFxwYWNrYWdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMaWNoYVxcXFxEZXNrdG9wXFxcXENPRElOR1xcXFxjbGVla1xcXFxwYWNrYWdlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9MaWNoYS9EZXNrdG9wL0NPRElORy9jbGVlay9wYWNrYWdlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuLy8gcGx1Z2luc1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKCdzcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc3R5bHVzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcclxuICAgICAgICAgIEBpbXBvcnQgXCIvLi4vc3JjL3N0eWxlcy9pbmRleC5zdHlsXCI7XHJcbiAgICAgICAgYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiB7XHJcbiAgICAgICAgbWFpbjogcmVzb2x2ZSgnc3JjL21haW4udHMnKSxcclxuICAgICAgfSxcclxuICAgICAgbmFtZTogJ0NsZWVrJyxcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQsIGVudHJ5TmFtZSkgPT4gYCR7ZW50cnlOYW1lfS4ke2Zvcm1hdH0uanNgLFxyXG4gICAgICBmb3JtYXRzOiBbJ2NqcycsICdlcyddLFxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsndnVlJywgJ3BpbmlhJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09ICdzdHlsZS5jc3MnKSByZXR1cm4gJ21haW4uY3NzJztcclxuICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIGVudHJ5Um9vdDogJ3NyYycsXHJcbiAgICAgIHRzY29uZmlnUGF0aDogJy4vdHNjb25maWcuanNvbicsXHJcbiAgICAgIG91dERpcjogJ2Rpc3QvdHlwZXMnLFxyXG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxyXG4gICAgfSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVUsU0FBUyxlQUFlO0FBQ3pWLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFFaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLEtBQUs7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxNQUdsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsYUFBYTtBQUFBLE1BQzdCO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsUUFBUSxjQUFjLEdBQUcsU0FBUyxJQUFJLE1BQU07QUFBQSxNQUN2RCxTQUFTLENBQUMsT0FBTyxJQUFJO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLE9BQU87QUFBQSxNQUN6QixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixjQUFJLFVBQVUsUUFBUTtBQUFhLG1CQUFPO0FBQzFDLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BQ1Isa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
