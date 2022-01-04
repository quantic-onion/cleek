import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Cleek from 'cleek';

// require('@/../node_modules/cleek-styles/index.css');

const myApp = createApp(App);
myApp.use(store);
myApp.use(router);
const CleekParams = {
  test: 'holis',
};
myApp.use(Cleek, CleekParams);
myApp.mount('#app');

console.log('ESTOY EN SANDBOX');
