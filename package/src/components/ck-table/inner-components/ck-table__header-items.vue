<script setup lang="ts">
import { computed } from 'vue'
// components
import CkButton from '../../ck-button.vue';
import CkInput from '../../ck-input.vue';
// hooks
import functions from '../../../utils/functions';

const props = defineProps<{
  search: string;
  hasColumnsManager: boolean;
  showRefreshBtn: boolean;
  hideItemsPerPage: boolean;
  currentPage: number;
  itemsPerPage: number;
  hideHeaderActions: boolean;
  listLength: number;
}>();
const emits = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'refreshList', idk: false): void;
  (e: 'openColumnsManager'): void;
}>();


const searchLocal = computed({
  get() { return props.search; },
  set(val: string) { emits('update:search', val); }
});
const hideSearch = computed(() => {
  return typeof searchLocal.value === 'undefined';
});
const itemsPerPageStart = computed(() => {
  return (props.currentPage -1) * props.itemsPerPage + 1;
});
const itemsPerPageEnd = computed(() => {
  const value = props.currentPage * props.itemsPerPage;
  if (!props.itemsPerPage || value > props.listLength) return props.listLength;
  return value;
});
const itemsPerPageIsVisible = computed(() => {
  return !props.hideItemsPerPage && props.listLength && props.currentPage;
});
const refreshBtnIsVisible = computed(() => {
  return itemsPerPageIsVisible.value || props.showRefreshBtn;
});
const searchGroupValue = computed(() => {
  if (itemsPerPageIsVisible.value && props.hasColumnsManager) {
    return 'center';
  }
  if (itemsPerPageIsVisible.value) return 'right';
  if (props.hasColumnsManager) return 'left';
  return '';
});

function checkRefresh() {
  const search = searchLocal.value;
  setTimeout(() => {
    if (search !== searchLocal.value) return;
    emits('refreshList', false);
  }, 1000);
}
functions.preventUnusedError([
  searchGroupValue,
  checkRefresh,
]);
</script>

<template lang="pug">
.ck-table__header-items
  template(v-if="!hideHeaderActions")
    //- refresh btn
    ck-button(
    v-if="refreshBtnIsVisible"
    type="flat"
    icon="rotate-right"
    title="Recargar lista"
    @click="emits('refreshList', false)"
    )
    //- pages
    .items-per-page(
    v-if="itemsPerPageIsVisible"
    :class="{ 'ck-component__group--left': (!hideSearch) }"
    )
      | {{ itemsPerPageStart }} - {{ itemsPerPageEnd }} de {{ listLength }}
    //- search
    ck-input(
    v-if="!hideSearch"
    v-model="searchLocal"
    icon="magnifying-glass"
    placeholder="Buscar..."
    :group="searchGroupValue"
    @input="checkRefresh()"
    )
    //- columns manager
    ck-button(
    icon="columns"
    type="filled"
    title="Administrador de columnas"
    v-if="hasColumnsManager"
    :group="itemsPerPageIsVisible || !hideSearch ? 'right' : ''"
    @click="emits('openColumnsManager')"
    )
</template>

<style lang="stylus" scoped>
@import '../../../styles/index';
.ck-table__header-items
  display flex
  .items-per-page
    font-size $globalFontSize-s
    display flex
    align-items center
    cursor pointer
    padding-x 10px
    // background-color rgba($globalBorderColor, .15) FIXRGBA
    border 1px solid $globalBorderColor
    border-radius:  $globalBorderRadius
</style>