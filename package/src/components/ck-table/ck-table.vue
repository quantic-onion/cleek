<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
// components
import CkTr from './ck-tr.vue';
import CkTd from './ck-td.vue';
import { qmObj } from 'quantic-methods';
import CkTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
import TablePagination from './inner-components/ck-table__pagination.vue';
import TableColumnsManager from './inner-components/ck-table__columns-manager.vue';
// types
import type { ColumnItem } from '../../types/table';
// hooks
import functions from '../../utils/functions';
import useWindowWidth from '../../hooks/windowWidth';

type Columns = ColumnItem[] | object;

const props = defineProps<{
  columns?: Columns,
  hasColumnsManager?: boolean;
  // pagination - header items
  currentPage?: number;
  itemsPerPage?: number;
  listLength?: number;
  paginationAlign?: 'left' | 'center' | 'right';
  // header items
  search?: string;
  hideHeaderActions?: boolean;
  showRefreshBtn?: boolean;
  hideItemsPerPage?: boolean;
  // style
  notFullWidth?: boolean;
  cellPadding?: 's' | 'm' | 'l' | 'none';
  cellPaddingY?: 's' | 'm' | 'l' | 'none';
  noResultsText?: string;
  notOverflow?: boolean;
  // mobile
  mobileMaxWidth?: Number,
}>();

const emits = defineEmits<{
  (e: 'refreshList', pageChange: boolean): void;
  (e: 'update:search', value: string): void;
  (e: 'update:currentPage', value: number): void;
}>();

const defaultNoResultsText = 'No se encontraron resultados';
const defaultItemsPerPage = 40;

const { windowWidth } = useWindowWidth();

const isPopupActive = ref({
  columnsManager: false,
});

const columnsAreObj = computed(() => !qmObj.isArray(props.columns || []));
const columnsArray = computed(() => {
  // object
  if (columnsAreObj.value) {
    const arr = Object.values(props.columns || []);
    const keys = Object.keys(props.columns || []);
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
  return columnsArray.value.filter(functions.isColumnDisplayed);
});

const searchLocal = computed({
  get() { return props.search || ''; },
  set(val: string) { emits('update:search', val); }
});
const currentPageLocal = computed({
  get() { return props.currentPage || 0; },
  set(val: number) {
    emits('update:currentPage', val);
  },
});

// isMobileVisible
const isMobileVisible = computed(() => {
  return windowWidth.value <= (props.mobileMaxWidth || 0);
});
function refreshList(pageChange: boolean = false) {
  emits('refreshList', pageChange);
}
function openColumnsManager() {
  if (columnsAreObj.value) {
    isPopupActive.value.columnsManager = true
  } else {
    console.log('ERROR ck-table', 'The columns list should be an object');
  }
}

const computedClassTable = computed(() => {
  const list = [];
  if (props.cellPadding) list.push(`table__cell-padding--${props.cellPadding}`);
  if (props.cellPaddingY) list.push(`table__cell-padding-y--${props.cellPaddingY}`);
  if (props.notFullWidth) list.push('not-full-width');
  return list;
});
// function testCurrentPage(cosito) {
//   this.emits('update:currentPage', cosito);
// }

functions.preventUnusedError([
  computedClassTable,
  defaultNoResultsText,
  isMobileVisible,
  currentPageLocal,
  searchLocal,
  filteredColumnsList,
  defaultItemsPerPage,
  openColumnsManager,
  refreshList,
  TableColumnsManager,
  TablePagination,
  TableHeaderItems,
  CkTableTitle,
]);
</script>

<template lang="pug">
//- columns manager
TableColumnsManager(
v-if="hasColumnsManager && columnsAreObj"
v-model="isPopupActive.columnsManager"
:columnsArray="columnsArray"
:columns="columns || []"
)
.ck-table
  .ck-table__header(v-if="$slots.header || !hideHeaderActions")
    //- header items
    TableHeaderItems(
    v-model:search="searchLocal"
    :hideHeaderActions="hideHeaderActions"
    :currentPage="currentPage"
    :hasColumnsManager="hasColumnsManager"
    :itemsPerPage="itemsPerPage || defaultItemsPerPage"
    :listLength="listLength"
    :showRefreshBtn="showRefreshBtn"
    :hideItemsPerPage="hideItemsPerPage"
    @refreshList="refreshList($event)"
    @openColumnsManager="openColumnsManager()"
    )
    //- header slot
    .ck-table__header--slot(v-if="$slots.header")
      slot(name="header")

  //- desktop
  .ck-table__table-container(
  v-if="!isMobileVisible"
  :class="{ 'not-overflow': notOverflow }"
  )
    table.ck-table__table(
    :class="computedClassTable"
    )
      //- header
      thead(v-if="filteredColumnsList.length && !($slots.mobile && isMobileVisible)")
        ck-tr
          ck-table-title(
          v-for="col in filteredColumnsList"
          :key="col.title"
          :col="col"
          )
      //- body
      tbody
        slot
        slot(name="desktop")
        //- noResultsText - if not used, listLength = undefined 
        ck-tr(v-if="listLength === 0")
          ck-td.no-result-text(colspan="100%" align="center")
            | {{ noResultsText || defaultNoResultsText }}
      //- footer
      tfoot(v-if="$slots.footer")
        slot(name="footer")
  //- @update:currentPage="testCurrentPage($event)"

  //- mobile
  .ck-table--mobile-container(v-if="isMobileVisible")
    slot(name="mobile")

  //- pagination
  TablePagination.ck-table__pagination(
  v-model:currentPage="currentPageLocal"
  :currentPage="currentPage"
  :itemsPerPage="itemsPerPage"
  :listLength="listLength"
  :align="paginationAlign"
  @refreshList="refreshList(true)"
  )
</template>

<style lang="stylus">
.ck-table__table-container .ck-table__table
  &.table__cell-padding--none
    td
      padding 0
  &.table__cell-padding-y--xs
    td
      padding-bottom .25rem
  &.table__cell-padding-y--s
    td
      padding-bottom .5rem
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
  .ck-table__header--slot
    display flex
    align-items flex-end
    flex-wrap wrap
    gap .5rem
.ck-table__pagination
  margin-top 1rem

.no-result-text
  background-color #eee
  color #666
  font-weight 600
  font-size 1.1rem
  padding 3rem 1rem
</style>