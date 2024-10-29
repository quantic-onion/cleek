import { App } from 'vue';
// types
import type { PartialDeep } from './types';
// utils
import { mergeDeep } from './utils/objetc-helpers';
// plugins
import vClickOutside from 'click-outside-vue3';
import FloatingVue from 'floating-vue';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// cleek-options
import type { CleekOptions } from './cleek-options/cleek-options.types';
import { defaultCleekOptions } from './cleek-options/default-cleek-options';
import { useCleekOptionsStore } from './cleek-options/cleek-options.store';
// components
import * as components from './components';
// styles
import 'floating-vue/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css';

// font awesome
library.add(fas);
library.add(far);
library.add(fab);

// install function executed by app.use()
function install(app: App, userOptions?: PartialDeep<CleekOptions>) {
  // cleek options
  useCleekOptionsStore().cleekOptions = mergeDeep(defaultCleekOptions, userOptions);
  // plugins
  app.use(vClickOutside);
  app.use(FloatingVue);
  // components
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}

// exports
export default install;
export * from './components'; // to allow the use of individual components
export { useCleekOptionsStore };
