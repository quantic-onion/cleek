import { storeToRefs } from 'pinia';
// components
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
// stores
import { useLayoutStore } from '@/stores/layout.stores.ts';

export const darkMode = JSON.parse(localStorage.layout).isDarkModeActive;

// const { isDarkModeActive } = storeToRefs(useLayoutStore());

export default {
  lang: "es",
  darkMode: darkMode,
  colors: {
    primary: "#DA135D",
    secondary: "#00ceff",
  },
  img: {
    basePath: "/images/",
  },
  button: {
    type: "outlined",
    textColor: darkMode ? '#f5f5f5' : '',
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
