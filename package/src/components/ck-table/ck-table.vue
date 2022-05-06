<template lang="pug">
//- columns manager
TableColumnsManager(
v-if="hasColumnsManager && columnsAreObj"
v-model="IsPopupActive.columnsManager"
:columnsArray="columnsArray"
:columns="columns"
)
.ck-table
  .ck-table__header(v-if="$slots.header || !hideHeaderActions")
    //- header items
    TableHeaderItems(
    v-model:search="searchLocal"
    :hideHeaderActions="hideHeaderActions"
    :currentPage="currentPage"
    :hasColumnsManager="hasColumnsManager"
    :itemsPerPage="itemsPerPage"
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
            | {{ noResultsText }}
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

<script setup lang="ts">
import { onBeforeUnmount, computed, nextTick, onMounted, ref } from 'vue';
import ckTr from './ck-tr.vue';
import ckTd from './ck-td.vue';
import ckTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
import TablePagination from './inner-components/ck-table__pagination.vue';
import TableColumnsManager from './inner-components/ck-table__columns-manager.vue';
import functions from '../../utils/functions';
import validators from '../../utils/validators';
import qm from '../../../node_modules/quantic-methods/dist/quantic-methods.es.ts';
import useWindowWidth from '../../hooks/windowWidth';
const { qmObj } = qm;

const { windowWidth } = useWindowWidth();

const props = defineProps({
  columns: { type: [Array, Object], required: true, default: () => ([]) },
  hasColumnsManager: { type: Boolean, default: false },
  // pagination - header items
  currentPage: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 40 },
  listLength: { type: Number, default: undefined },
  paginationAlign: { type: String, default: 'center', validator: validators.align },
  // header items
  search: { type: String, default: undefined },
  hideHeaderActions: { type: Boolean, default: false },
  showRefreshBtn: { type: Boolean, default: false },
  hideItemsPerPage: { type: Boolean, default: false },
  // style
  notFullWidth: { type: Boolean, default: false },
  cellPadding: { type: String, default: undefined }, // s, m, l, none
  cellPaddingY: { type: String, default: undefined }, // s, m, l, none
  noResultsText: { type: String, default: 'No se encontraron resultados' },
  notOverflow: { type: Boolean, default: false },
  // mobile
  mobileMaxWidth: { type: [Number, String], default: 0 },
});

const emits = defineEmits(['refreshList', 'update:search',  'update:currentPage']);

const IsPopupActive = ref({
  columnsManager: false,
});

const columnsAreObj = computed(() => !qmObj.isArray(props.columns));
const columnsArray = computed(() => {
  // object
  if (columnsAreObj.value) {
    const arr = Object.values(props.columns);
    const keys = Object.keys(props.columns);
    arr.forEach((col, index) => {
      const key = keys[index];
      col.name = key;
    });
    return arr;
  }
  // array
  // can be array of objects or array of strings
  const newList = [];
  props.columns.forEach((col) => {
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
  get() { return props.search; },
  set(val) { emits('update:search', val); }
});
const currentPageLocal = computed({
  get() { return props.currentPage; },
  set(val) {
    emits('update:currentPage', val);
  },
});

// isMobileVisible
const isMobileVisible = computed(() => {
  return windowWidth.value <= +props.mobileMaxWidth;
});
function refreshList(pageChange: boolean = false) {
  emits('refreshList', pageChange);
}
function openColumnsManager() {
  if (columnsAreObj.value) {
    IsPopupActive.value.columnsManager = true
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
//   this.$emit('update:currentPage', cosito);
// }
</script>

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