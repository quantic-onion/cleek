import { createApp } from "vue";
import App from "@/App.vue";
// import i18n from "@/i18n/i18n";
// import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import cleek from "cleek";
import cleekConfig from "@/cleek-config";
// styles
import "../node_modules/cleek/dist/style.css";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);
// i18n
// app.use(i18n);
// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
// router
app.use(router);
// cleek
app.use(cleek, cleekConfig);

app.mount("#app");

// import "@/assets/styles/main.styl";
// import "animate.css";
