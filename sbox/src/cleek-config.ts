import { storeToRefs } from 'pinia';
// components
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
// stores
import { useLayoutStore } from '@/stores/layout.stores.ts';

// const { isDarkModeActive } = storeToRefs(useLayoutStore());

export default {
  lang: "es",
  darkMode: localStorage.layout ? JSON.parse(localStorage.layout).isDarkModeActive : false,
  colors: {
    primary: "#DA135D",
    secondary: "#00ceff",
  },
  img: {
    basePath: "/images/",
  },
  button: {
    type: "outlined",
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
