<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCleekOptionsStore } from '@/main';

const props = defineProps<{
  listLength?: number;
  isLoading?: boolean;
  loadingText?: string;
  noResultsText?: string;
}>();

const { cleekOptions } = storeToRefs(useCleekOptionsStore());

const isNoResultsTextDisplayed = computed(() => {
  if (typeof props.listLength === 'undefined') return false;
  if (props.listLength) return false;
  return true;
});
const realLoadingText = computed(() => {
  if (props.loadingText) return props.loadingText;
  if (cleekOptions.value.lang === 'es') return 'Cargando...'; 
  return 'Loading...';
});
const realNoResultsText = computed(() => {
  if (props.noResultsText) return props.noResultsText;
  if (cleekOptions.value.lang === 'es') return 'No se encontraron resultados';
  return 'No results found';
});
</script>

<template>
  <!-- loadingText - noResultsText -->
  <ck-tr v-if="isNoResultsTextDisplayed">
    <ck-td class="no-result-text" colspan="100%" align="center">
      <!-- loadingText -->
      <template v-if="isLoading">
        <ck-icon class="mr-2" icon="spinner" spin/>
        {{ realLoadingText }}
      </template>
      <!-- noResultsText -->
      <template v-else-if="isNoResultsTextDisplayed">
        {{ realNoResultsText }}
      </template>
    </ck-td>
  </ck-tr>
</template>

<style lang="stylus" scoped>
.no-result-text
  background-color #eee
  color #666
  font-weight 600
  font-size 1.1rem
  padding 3rem 1rem
.dark-mode .no-result-text
  color $darkModeTextColor
  background-color $darkModeColorItems
</style>