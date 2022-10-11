// vite.config.js
import vue from "@vitejs/plugin-vue";

export default {
  build: {
    lib: {
      entry: "./src/main.js",
      name: "MyLibrary"
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          customElement: true,
          css: true
        }
      }
    })
  ]
};
