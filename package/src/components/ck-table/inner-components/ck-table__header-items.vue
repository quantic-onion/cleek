<script setup lang="ts">
import { computed } from 'vue';
// components
import CkIcon from '../../ck-icon.vue';
import CkButton from '../../ck-button.vue';
import CkInput from '../../ck-input.vue';
// types
import type { Layout, TableVersion } from '../../../types/cleek-options';
// hooks
import hooks from '../../../utils/global-hooks';

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
  version: TableVersion;
  isLoading: { type: boolean, default: undefined };
}>();

const emits = defineEmits<{
  (e: 'update:search', search: string): void;
  (e: 'refreshList', pageChange: boolean): void;
  (e: 'openColumnsManager'): void;
}>();

const searchLocal = computed({
  // @ts-ignore
  get() {
    return props.search;
  },
  set(val: string) {
    emits('update:search', val);
  },
});
const isSearchVisible = computed(() => {
  return typeof searchLocal.value !== 'undefined';
});
const itemsPerPageStart = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1;
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
  // version
  if (props.version) list.push(`version--${props.version}`);
  return list;
});

function checkRefresh() {
  const search = searchLocal.value;
  setTimeout(() => {
    if (search !== searchLocal.value) return;
    emits('refreshList', false);
  }, 1000);
}
</script>

<template>
<div class="ck-table__header-items" :class="computedClass">
  <template v-if="!hideHeaderActions">
    <!-- refresh btn -->
    <ck-button
      v-if="refreshBtnIsVisible"
      type="flat"
      icon="rotate-right"
      title="Recargar lista"
      backgroundColor="transparent"
      :layout="layout"
      @click="emits('refreshList', true)"
    />
    <!-- pages -->
    <div
      v-if="(isLoading && listLength === 0) || itemsPerPageIsVisible"
      class="items-per-page"
      :class="{ 'ck-component__group--left': (isSearchVisible) }"
    >
      <template v-if="isLoading && listLength === 0">
        <ck-icon class="px-2" icon="spinner" spin/>
      </template>
      <template v-else-if="itemsPerPageIsVisible">
        {{ itemsPerPageStart }} - {{ itemsPerPageEnd }} de {{ listLength }}
      </template>
    </div>
    <!-- search -->
    <ck-input
      v-if="isSearchVisible"
      v-model="searchLocal"
      class="ck-table--search-input"
      icon="magnifying-glass"
      placeholder="Buscar..."
      :group="searchGroupValue"
      :layout="layout"
      :borderColor="version === 'colored' ? 'white' : ''"
      @input="checkRefresh()"
    />
    <!-- columns manager -->
    <ck-button
      icon="columns"
      type="filled"
      title="Administrador de columnas"
      v-if="hasColumnsManager"
      :group="itemsPerPageIsVisible || isSearchVisible ? 'right' : ''"
      :layout="layout"
      @click="emits('openColumnsManager')"
    />
  </template>
</div>
</template>

<style lang="stylus" scoped>
@import '../../../styles/index'
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
    border-radius $globalBorderRadius
  &.rounded
    .items-per-page
      border-radius-left 2rem
      padding-left 1rem
  &.squared
    .items-per-page
      border-radius 0
  &.version--colored
    .items-per-page
      border-color var(--primary)
      background-color var(--primary)
      color #eee
</style>
