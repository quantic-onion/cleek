<template lang="pug">
.ck-table
  .ck-table__header(v-if="$slots.header || !hideHeaderActions")
    .ck-table__header--slot(v-if="$slots.header")
      slot(name="header")
    TableHeaderItems(
    v-if="!hideHeaderActions"
    v-model:search="searchLocal"
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :listLength="listLength"
    :hideRefreshBtn="hideRefreshBtn"
    :hideItemsPerPage="hideItemsPerPage"
    @refreshList="refreshList($event)"
    )
  table.ck-table__table
    //- header
    thead(v-if="columns.length")
      ck-tr
        ck-table-title(
        v-for="col in columns"
        :key="col.title"
        :col="col"
        )
    //- body
    tbody
      slot
    //- footer
    tfoot(v-if="$slots.footer")
      slot(name="footer")
  TablePagination(
  :currentPage="currentPage"
  @update:currentPage="testCurrentPage($event)"
  :itemsPerPage="itemsPerPage"
  :listLength="listLength"
  :align="paginationAlign"
  @refreshList="refreshList(true)"
  )
</template>

<script setup lang="ts">
import ckTr from './ck-tr.vue';
import ckTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
import TablePagination from './inner-components/ck-table__pagination.vue';
</script>

<script lang="ts">
import validators from '../utils/validators';
const defaultPaginationAlign = 'center';
const defaultItemsPerPage = 40;
export default {
  name: 'CkTable',
  props: {
    columns: { type: Array, required: true, default: () => ([]) },
    // pagination - header items
    currentPage: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: defaultItemsPerPage },
    listLength: { type: Number, default: 0 },
    paginationAlign: { type: String, default: defaultPaginationAlign, validator: validators.align },
    // header items
    search: { type: String, default: undefined },
    hideHeaderActions: { type: Boolean, default: false },
    hideRefreshBtn: { type: Boolean, default: false },
    hideItemsPerPage: { type: Boolean, default: false },
  },
  emits: ['refreshList', 'update:search',  'update:currentPage'],
  computed: {
    searchLocal: {
      get() { return this.search; },
      set(val) { this.$emit('update:search', val); }
    },
    currentPageLocal: {
      get() { return this.currentPage; },
      set(val) {
        console.log('val', val);
        this.$emit('update:currentPage', val);
      },
    },
  }, // computed
  methods: {
    // refreshList
    // testCurrentPage

    refreshList(pageChange: boolean = false) {
      this.$emit('refreshList', pageChange);
    },
    testCurrentPage(cosito) {
      console.log('cosito', cosito);
      this.$emit('update:currentPage', cosito);
    },
  }, // methods
}; // export default
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
  flex-flow wrap-reverse
  .ck-table__header--slot
    display flex
    align-items flex-end
    flex-wrap wrap
</style>