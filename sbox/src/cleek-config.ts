import { storeToRefs } from 'pinia';
// components
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
// stores
import { useLayoutStore } from '@/stores/layout.stores.ts';

export const darkMode = !localStorage.layout ? false : JSON.parse(localStorage.layout).isDarkModeActive;

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
  popup: {
    // textColor: 'secondary',
    // headerAlign: 'center',
    headerColor: '#FBD184',
    // acceptBtnType: 'filled',
    // maxWidth: '800px',
    // fontSize: '1.2rem',
  },
  // div: {
  //   gap: '1rem',
  // },
};
