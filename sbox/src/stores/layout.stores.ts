import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'layout',

  state: () => ({
    isDarkModeActive: false,
  }),

  persist: {
    storage: localStorage,
  },
});
