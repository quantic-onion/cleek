import { App, Plugin } from 'vue';
import { store } from './store'

// vue components
import * as components from './components/index.js';

function setDefaultConfig(options) {
  globalVariables.imagesFolderPath = options.imgPath;
}

function setDefaultColors(options) {
  if (!options) return;
  var r = document.querySelector(':root');
  const colorList = [
    'primary',
    'secondary',
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'dark',
    'light',
  ];
  if (options.colors) {
    colorList.forEach((colorName) => {
      const colorValue = options.colors[colorName];
      if (colorValue) r.style.setProperty(`--${colorName}`, colorValue);
    });
  }
}

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> = function installCleek(app: App, options: any) {

  app.config.globalProperties.$cleekOptions = options;

  console.log('arranco paquete', options);
  setDefaultColors(options);
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
