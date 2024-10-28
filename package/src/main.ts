import { App, Plugin } from 'vue';
// cleek-options
import type { CleekOptions } from './cleek-options/cleek-options.types';
import { defaultCleekOptions } from './cleek-options/default-cleek-options';
import { useCleekOptionsStore } from './cleek-options/cleek-options.store';
// vue components
import * as components from './components/index.js';
export * from './components/index.js'; // to allow the use of individual components
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// datepicker
import '@vuepic/vue-datepicker/dist/main.css';
// click-outside
import vClickOutside from 'click-outside-vue3';
// floating-vue
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

// fontawesome
library.add(fas);
library.add(far);
library.add(fab);

function getCleekOptions(userOptions: CleekOptions) {
  const options = defaultCleekOptions;
  for (const categoryName in defaultCleekOptions) {
    if (userOptions[categoryName]) {
      if (typeof userOptions[categoryName] === 'string' || typeof userOptions[categoryName] === 'boolean') {
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
  return options;
}

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installCleek(app: App, options: CleekOptions) {
  useCleekOptionsStore().cleekOptions = getCleekOptions(options);
  // plugins
  app.use(vClickOutside);
  app.use(FloatingVue);
  // vue components
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

export default install;
