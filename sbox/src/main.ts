import { createApp } from "vue";
import App from "./App.vue";
// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// plugins
import router from "./router";
import cleek from "cleek";
// resources
import cleekConfig from "@/cleek-config";
// styles
import "cleek/main.css";

// create app
const app = createApp(App);
// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
// plugins
app.use(router);
app.use(cleek as any, cleekConfig);
// mount
app.mount("#app");
