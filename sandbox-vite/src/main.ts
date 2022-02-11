import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Cleek
import Cleek from 'cleek';
import cleekConfig from './cleek-config';
app.use(Cleek, cleekConfig);
import '../node_modules/cleek/dist/style.css';

app.mount('#app')
