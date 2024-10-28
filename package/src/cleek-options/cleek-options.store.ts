import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { defaultCleekOptions } from './default-cleek-options';
// utils
import { setRootColors } from '@/utils/colors-helpers';

export const useCleekOptionsStore = defineStore('cleek-options', () => {
  const cleekOptions = ref(defaultCleekOptions);
  const colorsOptions = computed(() => cleekOptions.value.colors);
  const stylesOptions = computed(() => cleekOptions.value.styles);
  const buttonOptions = computed(() => cleekOptions.value.button);
  const divOptions = computed(() => cleekOptions.value.div);
  const imgOptions = computed(() => cleekOptions.value.img);
  const popupOptions = computed(() => cleekOptions.value.popup);
  const selectOptions = computed(() => cleekOptions.value.select);
  const tableOptions = computed(() => cleekOptions.value.table);
  watch(colorsOptions, (val) => setRootColors(val), { deep: true, immediate: true });
  return {
    cleekOptions,
    colorsOptions,
    stylesOptions,
    buttonOptions,
    divOptions,
    imgOptions,
    popupOptions,
    selectOptions,
    tableOptions,
  };
});
