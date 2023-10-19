import { App, Plugin } from 'vue';
import { store } from './store';
import FloatingVue from 'floating-vue';
// import ckNotifyComponent from './components/ck-notify/ck-notify.vue';
import defaultCleekOptions from './default-cleek-options';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// datepicker
import '@vuepic/vue-datepicker/dist/main.css';
// types
import { CleekOptions } from './types/cleek-options';

library.add(fas);
library.add(far);
library.add(fab);
import 'floating-vue/dist/style.css';

// vue components
import * as components from './components/index.js';

function setRootColors(colors) {
  var r = document.querySelector(':root');
  for (const key in colors) {
    const colorValue = colors[key];
    r.style.setProperty(`--${key}`, colorValue);
  }
}

function getCleekOptions(userOptions: CleekOptions) {
  const options = defaultCleekOptions;
  for (const categoryName in defaultCleekOptions) {
    if (userOptions[categoryName]) {
      if (typeof userOptions[categoryName] === 'string') {
        // set string
        options[categoryName] = userOptions[categoryName];
      } else {
        // set array
        for (const key in userOptions[categoryName]) {
          const value = userOptions[categoryName][key];
          if (value) options[categoryName][key] = value;
        }
      }
    }
  }
  setRootColors(options.colors);
  return options;
}

const cleekGlobalComponent = {
  notify: {
    ckNotify() {},
    ckSuccess() {},
    ckDanger() {},
    ckWarning() {},
  },
};

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installCleek(app: App, options: CleekOptions) {
  app.config.globalProperties.$cleekOptions = getCleekOptions(options);
  app.use(FloatingVue);
  // app.config.globalProperties.$cleek = ckNotifyComponent;
  // app.config.globalProperties.$cleek = cleekGlobalComponent;
  // vue components
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index.js';
