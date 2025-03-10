<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// components
import CkIcon from '../ck-icon.vue';
import CkTr from './ck-tr.vue';
import CkTd from './ck-td.vue';
import { qmObj } from 'quantic-methods';
import CkTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
import TablePagination from './inner-components/ck-table__pagination.vue';
import TableColumnsManager from './inner-components/ck-table__columns-manager.vue';
import LoadingAndNoResultsText from './loading-and-no-results-text/LoadingAndNoResultsText.vue';
// types
import type { ColumnItem } from '../../types/table';
import type { Align, Color, Layout, TableVersion } from '../../cleek-options/cleek-options.types';
// hooks
import hooks from '../../utils/global-hooks';
import useWindowWidth from '../../hooks/windowWidth';
// class
import { SelectedRows } from '../index';

type Columns = ColumnItem[] | object;
type CellPadding = 's' | 'm' | 'l' | 'none';

const rowSelectorKey = 'id';

const selectedRows = defineModel<SelectedRows>('selectedRows');

const props = defineProps<{
  rows: any[];
  columns?: Columns;
  hasColumnsManager?: boolean;
  // pagination - header items
  currentPage?: number;
  itemsPerPage?: number;
  listLength?: number;
  paginationAlign?: Align;
  // header items
  search?: string;
  loadingText?: string;
  isLoading?: { type: boolean, default: undefined };
  hideHeaderActions?: boolean;
  showRefreshBtn?: boolean;
  hideItemsPerPage?: boolean;
  // style
  darkMode?: { type: boolean, default: undefined };
  notFullWidth?: boolean;
  striped?: boolean;
  cellPadding?: CellPadding;
  cellPaddingY?: CellPadding;
  noResultsText?: string;
  notOverflow?: boolean;
  layout?: Layout;
  version?: TableVersion;
  headerTextColor?: Color;
  headerBackgroundColor?: Color;
  // mobile
  mobileMaxWidth?: Number;
}>();

const emits = defineEmits<{
  (e: 'refreshList', pageChange: boolean): void;
  (e: 'update:search', value: string): void;
  (e: 'update:currentPage', value: number): void;
}>();

const defaultItemsPerPage = 40;
const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();
const isPopupActive = ref({
  columnsManager: false,
});

const isSelectable = computed(() => !!selectedRows.value);
const isDarkModeActive = computed(() => {
  if (typeof props.darkMode !== 'undefined') return props.darkMode;
  return cleekOptions.value.darkMode;
});
const totalPages = computed(() => {
  return Math.ceil(props.listLength / props.itemsPerPage);
});
const realTableVersion = computed(() => {
  if (props.version) return props.version;
  if (cleekOptions.value) return cleekOptions.value.table.version;
  return 'default';
});
const realHeaderTextColor = computed(() => {
  if (props.headerTextColor) return props.headerTextColor;
  if (cleekOptions.value) { 
    if (cleekOptions.value.table.headerTextColor) {
      return cleekOptions.value.table.headerTextColor;
    }
    if (isDarkModeActive.value) return '#ccc'; // TODO move to defaults
  }
});
const realHeaderBackgroundColor = computed(() => {
  if (props.headerBackgroundColor) return props.headerBackgroundColor;
  if (cleekOptions.value) return cleekOptions.value.table.headerBackgroundColor;
});
// @ts-ignore
const columnsAreObj = computed(() => !qmObj.isArray(props.columns || []));
const columnsArray = computed(() => {
  // object
  if (columnsAreObj.value) {
    // @ts-ignore
    const arr = Object.values(props.columns || []);
    const keys = Object.keys(props.columns || []);
    // @ts-ignore
    arr.forEach((col, index) => {
      const key = keys[index];
      col.name = key;
    });
    return arr;
  }
  // array
  // can be array of objects or array of strings
  const newList: any[] = [];
  // @ts-ignore
  (props.columns || []).forEach((col: ColumnItem) => {
    if (typeof col === 'string') {
      newList.push({ title: col });
    } else {
      newList.push(col);
    }
  });
  return newList;
});

// filter
const filteredColumnsList = computed(() => {
  return columnsArray.value.filter(hooks.isColumnDisplayed);
});

const searchLocal = computed({
  // @ts-ignore
  get() {
    return props.search;
  },
  set(val: string) {
    emits('update:search', val);
  },
});
const currentPageLocal = computed({
  get() {
    return props.currentPage || 0;
  },
  set(val: number) {
    emits('update:currentPage', val);
  },
});
const realLayout = computed(() => props.layout || cleekOptions.value.styles.layout);
// isMobileVisible
const isMobileVisible = computed(() => {
  return windowWidth.value <= (+props.mobileMaxWidth || 0);
});
function refreshList(pageChange: boolean = false) {
  emits('refreshList', pageChange);
}
function openColumnsManager() {
  if (columnsAreObj.value) {
    isPopupActive.value.columnsManager = true;
  } else {
    console.log('ERROR ck-table', 'The columns list should be an object');
  }
}

const computedClassTable = computed(() => {
  const list = [];
  if (props.cellPadding) list.push(`table__cell-padding--${props.cellPadding}`);
  if (props.cellPaddingY) list.push(`table__cell-padding-y--${props.cellPaddingY}`);
  if (props.notFullWidth) list.push('not-full-width');
  if (isDarkModeActive.value) list.push('dark-mode');
  const striped = props.striped || cleekOptions.value.table?.striped;
  if (striped) list.push('striped-table');
  return list;
});
const isFullPageSelected = computed(() => {
  const ids = props.rows.map((row) => row[rowSelectorKey]);
  if (selectedRows.value.areAllRowsSelecteds(ids)) return true;
  if (selectedRows.value.isAnyRowsSelected(ids)) return undefined;
  return false;
});

function selectOrUnselectAll() {
  const ids = props.rows.map((row) => row[rowSelectorKey]);
  if (isFullPageSelected.value) {
    selectedRows.value.removeManyRows(ids);
  } else {
    selectedRows.value.addManyRows(ids);
  }
}
</script>

<template>
<!-- columns manager -->
<TableColumnsManager
  v-if="hasColumnsManager && columnsAreObj"
  v-model="isPopupActive.columnsManager"
  :isLoading="isLoading"
  :columnsArray="columnsArray"
  :columns="columns || []"
/>
<div class="ck-table">
  <div v-if="$slots.header || !hideHeaderActions" class="ck-table__header">
    <!-- header items -->
    <TableHeaderItems
      v-model="searchLocal"
      :hideHeaderActions="hideHeaderActions"
      :currentPage="currentPage"
      :hasColumnsManager="hasColumnsManager"
      :itemsPerPage="itemsPerPage || defaultItemsPerPage"
      :listLength="listLength"
      :showRefreshBtn="showRefreshBtn"
      :hideItemsPerPage="hideItemsPerPage"
      :layout="realLayout"
      :version="realTableVersion"
      :isLoading="isLoading"
      @refreshList="refreshList($event)"
      @openColumnsManager="openColumnsManager()"
    />
    <!-- header slot -->
    <div
      v-if="$slots.header"
      class="ck-table__header--slot"
      :class="{ 'full-width': hideHeaderActions }"
    >
      <slot name="header"/>
    </div>
  </div>
  <!-- headerBottom -->
  <div v-if="$slots.headerBottom" class="ck-table__header-bottom--slot">
    <slot name="headerBottom"/>
  </div>
  <!-- selectedRows -->
  <template v-if="isSelectable || (filteredColumnsList.length && !($slots.mobile && isMobileVisible))">
    <div class="header-row">
      <div v-if="selectedRows?.ids?.size" class="selected-rows-actions">
        <div class="selected-rows-actions__left">
          <ck-checkbox
            class="main-checkbox"
            usesThirdState
            size="xs"
            color="#BABDBF"
            :modelValue="isFullPageSelected"
            @click="selectOrUnselectAll()"
          />
          <ck-chip class="nowrap cursor-pointer" size="s" iconRight="times" @click="selectedRows.removeAll()">
            {{ selectedRows.ids.size }} seleccionado{{ selectedRows.ids.size === 1 ? '' : 's' }}
          </ck-chip>
        </div>
        <slot name="selectedRowsActions"></slot>
        <ck-button
          v-if="currentPage && totalPages > 1"
          size="s"
          color="dark"
        >
          seleccionar todas las páginas
        </ck-button>
      </div>
    </div>
  </template>
  <!-- desktop -->
  <div
    v-if="!isMobileVisible"
    class="ck-table__table-container"
    :class="{ 'not-overflow': notOverflow }"
  >
    <table class="ck-table__table" :class="computedClassTable">
      <thead v-if="!selectedRows?.ids?.size">
        <tr>
          <th v-if="isSelectable">
            <ck-checkbox
              class="main-checkbox"
              usesThirdState
              size="xs"
              color="#BABDBF"
              :modelValue="isFullPageSelected"
              @click="selectOrUnselectAll()"
            />
          </th>
          <CkTableTitle
            v-for="col in filteredColumnsList"
            :key="col.title"
            :col="col"
            :textColor="realHeaderTextColor"
            :backgroundColor="realHeaderBackgroundColor"
          />
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        <slot/>
        <slot name="desktop"/>
        <!-- slot row -->
        <ck-tr v-for="(row, rowIndex) in rows" :key="row[rowSelectorKey]">
          <ck-td v-if="isSelectable" autoWidth>
            <ck-checkbox
              size="xs"
              color="#BABDBF"
              :modelValue="selectedRows.isRowSelected(row[rowSelectorKey])"
              @click="selectedRows.switchValue(row[rowSelectorKey])"
            />
          </ck-td>
          <slot name="row" :row="row" :rowIndex="rowIndex">
          </slot>
        </ck-tr>
        <LoadingAndNoResultsText
          :listLength="listLength"
          :isLoading="isLoading"
          :loadingText="loadingText"
          :noResultsText="noResultsText"
        />
      </tbody>
      <!-- footer -->
      <tfoot v-if="$slots.footer">
        <slot name="footer"/>
      </tfoot>
    </table>
  </div>

  <!-- mobile -->
  <div v-if="isMobileVisible" class="ck-table--mobile-container">
    <slot name="mobile"/>
    <LoadingAndNoResultsText
      :listLength="listLength"
      :isLoading="isLoading"
      :loadingText="loadingText"
      :noResultsText="noResultsText"
    />
  </div>

  <!-- pagination -->
  <TablePagination
    v-if="currentPage && totalPages > 1"
    v-model:currentPage="currentPageLocal"
    class="ck-table__pagination"
    :totalPages="totalPages"
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :listLength="listLength"
    :align="paginationAlign"
    :layout="realLayout"
    @refreshList="refreshList(true)"
  />
</div>
</template>

<style lang="stylus">
.header-row
  background-color transparent !important
.ck-table__table-container .ck-table__table
  &.table__cell-padding--none
    td
      padding 0
  &.table__cell-padding-y--none
    td
      padding-y 0.25rem
  &.table__cell-padding-y--xs
    td
      padding-y 0.25rem
  &.table__cell-padding-y--s
    td
      padding-y 0.5rem
.ck-table__table
  &.striped-table > tbody > tr
    background-color white
    &:nth-child(even)
      background-color #f8f8f8
      // border-bottom 1px solid #e1e1e1
      // border-top 1px solid #e1e1e1
  &.dark-mode
    &.striped-table > tbody > tr
      color $darkModeTextColor
      background-color $darkModeColorItems
      &:nth-child(even)
        background-color $darkModeTableBgAlternativeColor
</style>

<style lang="stylus" scoped>
.ck-table__table-container
  max-width 100%
  overflow auto
  &.not-overflow
    overflow initial
  .ck-table__table
    width 100%
    border-collapse collapse
    display table
    margin 0
    &.not-full-width
      width unset
.ck-table__header
  display flex
  flex-wrap wrap
  justify-content space-between
  align-items flex-end
  flex-direction row-reverse
  margin-bottom 0.5rem
  gap 0.5rem
  .ck-table__header--slot
    display flex
    align-items flex-end
    flex-wrap wrap
    gap 0.5rem
    &.full-width
      width 100%
  .ck-table__header-bottom--slot
    width 100%
.selected-rows-actions
  width 100%
  display flex
  justify-content space-between
  align-items flex-end
  gap 1rem
  padding 0.5rem
  .selected-rows-actions__left
    display flex
    align-items center
    gap 0.5rem
.main-checkbox
  margin-left -1px
  margin-bottom -1px
.ck-table__pagination
  margin-top 1rem
</style>
