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
    v-if="!hideHeaderActions"
    v-model:search="searchLocal"
    :currentPage="currentPage"
    :hasColumnsManager="hasColumnsManager"
    :itemsPerPage="itemsPerPage"
    :listLength="listLength"
    :hideRefreshBtn="hideRefreshBtn"
    :hideItemsPerPage="hideItemsPerPage"
    @refreshList="refreshList($event)"
    @openColumnsManager="openColumnsManager()"
    )
    //- header slot
    .ck-table__header--slot(v-if="$slots.header")
      slot(name="header")
  table.ck-table__table
    //- header
    thead(v-if="filteredColumnsList.length")
      ck-tr
        ck-table-title(
        v-for="col in filteredColumnsList"
        :key="col.title"
        :col="col"
        )
    //- body
    tbody
      slot
    //- footer
    tfoot(v-if="$slots.footer")
      slot(name="footer")
  //- @update:currentPage="testCurrentPage($event)"
  TablePagination(
  v-model:currentPage="currentPageLocal"
  :currentPage="currentPage"
  :itemsPerPage="itemsPerPage"
  :listLength="listLength"
  :align="paginationAlign"
  @refreshList="refreshList(true)"
  )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import functions from '../utils/functions';
import ckTr from './ck-tr.vue';
import ckTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
import TablePagination from './inner-components/ck-table__pagination.vue';
import TableColumnsManager from './inner-components/ck-table__columns-manager.vue';
import validators from '../utils/validators';
import qm from '../../node_modules/quantic-methods/dist/quantic-methods.es.ts';
const { qmObj } = qm;

const props = defineProps({
  columns: { type: [Array, Object], required: true, default: () => ([]) },
  hasColumnsManager: { type: Boolean, default: false },
  // pagination - header items
  currentPage: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 40 },
  listLength: { type: Number, default: 0 },
  paginationAlign: { type: String, default: 'center', validator: validators.align },
  // header items
  search: { type: String, default: undefined },
  hideHeaderActions: { type: Boolean, default: false },
  hideRefreshBtn: { type: Boolean, default: false },
  hideItemsPerPage: { type: Boolean, default: false },
});

const emits = defineEmits(['refreshList', 'update:search',  'update:currentPage']);

const IsPopupActive = ref({
  columnsManager: false,
});
const columnsAreObj = computed(() => !qmObj.isArray(props.columns));
const columnsArray = computed(() => {
  // array
  if (!columnsAreObj.value) return props.columns;
  // object
  const arr = Object.values(props.columns);
  const keys = Object.keys(props.columns);
  arr.forEach((col, index) => {
    const key = keys[index];
    col.name = key;
  });
  return arr;
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
// function testCurrentPage(cosito) {
//   this.$emit('update:currentPage', cosito);
// }
</script>

<style lang="stylus" scoped>
.ck-table__table
  width 100%
  border-collapse collapse
  display table
.ck-table__header
  display flex
  flex-wrap wrap
  justify-content space-between
  align-items end
  flex-direction row-reverse
  .ck-table__header--slot
    display flex
    align-items flex-end
    flex-wrap wrap
</style>