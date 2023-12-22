import { storeToRefs } from 'pinia';
// components
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
// stores
import { useLayoutStore } from '@/stores/layout.stores.ts';

// const { isDarkModeActive } = storeToRefs(useLayoutStore());

console.log('value', JSON.parse(localStorage.layout));
console.log('value', JSON.parse(localStorage.layout).isDarkModeActive);

export default {
  lang: "es",
  darkMode: JSON.parse(localStorage.layout).isDarkModeActive,
  colors: {
    primary: "#DA135D",
    secondary: "#00ceff",
  },
  img: {
    basePath: "/images/",
  },
  button: {
    type: "filled",
  },
  select: {
    clearValue: null,
  },
  table: {
    striped: true,
    version: "colored",
  },
  // div: {
  //   gap: '1rem',
  // },
};
