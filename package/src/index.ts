import { App, Plugin } from 'vue';
import { store } from './store'
import FloatingVue from 'floating-vue'
import ckNotifyComponent from './components/ck-notify/ck-notify.vue';
import defaultCleekOptions from './default-cleek-options';

import 'floating-vue/dist/style.css'

// vue components
import * as components from './components/index.js';

function setDefaultConfig(options) {
  globalVariables.imagesFolderPath = options.imgPath;
}

function setRootColors(colors) {
  var r = document.querySelector(':root');
  for (const key in colors) {
    const colorValue = colors[key];
    r.style.setProperty(`--${key}`, colorValue);
  }
}

function getCleekOptions(userOptions) {
  const options = defaultCleekOptions;
  for (const category in defaultCleekOptions) {
    if (userOptions[category]) {
      for (const key in userOptions[category]) {
        const value = userOptions[category][key];
        if (value) options[category][key] = value;
      }
    }
  }
  setRootColors(options.colors);
  // console.log('finalOptions', options);
  return options;
}

const cleekGlobalComponent = {
  notify: {
    ckNotify() {

    },
    ckSuccess() {

    },
    ckDanger() {

    },
    ckWarning() {

    },
  },
};

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installCleek(app: App, options: any) {
  app.config.globalProperties.$cleekOptions = getCleekOptions(options);
  app.use(FloatingVue)
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
