import { createApp } from 'vue';
import './registerServiceWorker';
import Cleek from 'cleek';

import store from './store';
import App from './App.vue';
import router from './router';

// require('@/../node_modules/cleek-styles/index.css');

const myApp = createApp(App);
myApp.use(store);
myApp.use(router);

const CleekParams = {
  test: 'holis',
};
myApp.use(Cleek, CleekParams);
myApp.mount('#app');


// css
require('cleek/dist/style.css');
