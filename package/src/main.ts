import { App, Plugin } from 'vue';
// cleek-options
import defaultCleekOptions from './default-cleek-options';
import { CleekOptions } from './types/cleek-options';
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

function hexToRgb(hex: string) {
  // Remove the hash symbol (#) if it exists
  hex = hex.replace(/^#/, '');
  // Parse the hex value into individual red, green, and blue components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Return the RGB values as an object
  return { r, g, b };
}
function setRootColors(colors) {
  const r = document.querySelector(':root') as any;
  for (const key in colors) {
    const colorHex = colors[key];
    const rgbColor = hexToRgb(colors[key]);
    r.style.setProperty(`--${key}`, colorHex);
    r.style.setProperty(`--${key}-rgb`, `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`);
  }
}
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
  setRootColors(options.colors);
  return options;
}

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installCleek(app: App, options: CleekOptions) {
  app.config.globalProperties.$cleekOptions = getCleekOptions(options);
  // plugins
  app.use(vClickOutside);
  app.use(FloatingVue);
  // vue components
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

export default install;
