import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Cleek from 'cleek';

import App from './App.vue'
import router from './router'
import cleekConfig from './cleek-config';

// comment for build
import 'cleek-style';
// unccoment for build
// import '@/../node_modules/cleek/dist/style.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Cleek, cleekConfig);

app.mount('#app')
