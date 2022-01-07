import { createApp } from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import Cleek from '@/entry.esm';

const app = createApp(Dev);

console.log('ESTOY EN PACKAGE');

import ElementsShower from './showers/_DefaultShower.vue';
app.component('ElementsShower', ElementsShower);

// Cleek
const CleekParams = {
  primary: '#15b0ce',
  secondary: '#22223e',
};
app.use(Cleek, CleekParams);

app.mount('#app');
