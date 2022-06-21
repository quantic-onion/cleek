<script setup lang="ts">
import { computed } from 'vue';
// components
import CkButton from '../../ck-button.vue';
import CkInput from '../../ck-input.vue';
// types
import { Layout } from '../../../types/cleek-options';
// hooks
import hooks from '../../../utils/functions';

const props = defineProps<{
  search?: string;
  hasColumnsManager: boolean;
  showRefreshBtn: boolean;
  hideItemsPerPage: boolean;
  currentPage: number;
  itemsPerPage: number;
  hideHeaderActions: boolean;
  listLength: number;
  layout: Layout;
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
const isSearchVisible = computed(() => {
  return typeof searchLocal.value !== 'undefined';
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
const computedClass = computed(() => {
  const list = [];
  // layout
  if (props.layout) list.push(props.layout);
  return list;
});

function checkRefresh() {
  const search = searchLocal.value;
  setTimeout(() => {
    if (search !== searchLocal.value) return;
    emits('refreshList', false);
  }, 1000);
}

hooks.preventUnusedError([
  searchGroupValue,
  checkRefresh,
]);
</script>

<template lang="pug">
.ck-table__header-items(:class="computedClass")
  template(v-if="!hideHeaderActions")
    //- refresh btn
    ck-button(
    v-if="refreshBtnIsVisible"
    type="flat"
    icon="rotate-right"
    title="Recargar lista"
    :layout="layout"
    @click="emits('refreshList', false)"
    )
    //- pages
    .items-per-page(
    v-if="itemsPerPageIsVisible"
    :class="{ 'ck-component__group--left': (isSearchVisible) }"
    )
      | {{ itemsPerPageStart }} - {{ itemsPerPageEnd }} de {{ listLength }}
    //- search
    ck-input(
    v-if="isSearchVisible"
    v-model="searchLocal"
    icon="magnifying-glass"
    placeholder="Buscar..."
    :group="searchGroupValue"
    :layout="layout"
    @input="checkRefresh()"
    )
    //- columns manager
    ck-button(
    icon="columns"
    type="filled"
    title="Administrador de columnas"
    v-if="hasColumnsManager"
    :group="itemsPerPageIsVisible || isSearchVisible ? 'right' : ''"
    :layout="layout"
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
  &.rounded
    .items-per-page
      border-radius-left 2rem
      padding-left 1rem
  &.squared
    .items-per-page
      border-radius 0
</style>