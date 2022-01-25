<template lang="pug">
.ck-table
  .ck-table__header(v-if="$slots.header || !hideHeaderActions")
    slot(name="header")
    TableHeaderItems(
    v-if="!hideHeaderActions"
    v-model:search="searchLocal"
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :listLength="listLength"
    :refreshBtn="refreshBtn"
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
      slot(name="footeer")
</template>

<script setup lang="ts">
import ckTr from './ck-tr.vue';
import ckTableTitle from './inner-components/ck-table__title.vue';
import TableHeaderItems from './inner-components/ck-table__header-items.vue';
</script>

<script lang="ts">
export default {
  props: {
    columns: { type: Array, required: true, default: () => ([]) },
    // pagination
    currentPage: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: 0 },
    listLength: { type: Number, default: 0 },
    // header items
    search: { type: String, default: undefined },
    hideHeaderActions: { type: Boolean, default: false },
    refreshBtn: { type: Boolean, default: false },
    hideItemsPerPage: { type: Boolean, default: false },
  },
  emits: ['refreshList', 'update:search'],
  computed: {
    searchLocal: {
      get() { return this.search; },
      set(val) { this.$emit('update:search', val); }
    },
  },
  methods: {
    // refreshList

    refreshList(pageChange: boolean = false) {
      this.$emit('refreshList', pageChange);
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
  align-items flex-end
  flex-direction row-reverse
</style>