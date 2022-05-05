<template lang="pug">
.ck-table__pagination-container(
v-if="currentPage && totalPages > 1"
:class="`pagination-align--${align}`"
)
  .ck-table__pagination
    //- arrow left
    .ck-table__pagination--arrow-left(
    v-if="hasArrowLeft"
    @click="updateCurrentPage(currentPage - 1)"
    )
      ck-icon(icon="arrow-left")
    //- list left
    .ck-table__pagination-item.pagination-item__left(
    v-for="num in listLeft"
    @click="updateCurrentPage(num)"
    )
      | {{ num }}
    //- input
    ck-input.ck-table__pagination-input(
    autoSelect 
    type="number"
    width="50px"
    align="center"
    v-model="currentPageLocal2"
    @change="validateInputNumber($event.target.value)"
    )
    //- list right
    .ck-table__pagination-item.pagination-item__right(
    v-for="num in listRight"
    @click="updateCurrentPage(num)"
    )
      | {{ num }}
    //- arrow right
    .ck-table__pagination--arrow-right(
    v-if="hasArrowRight"
    @click="updateCurrentPage(currentPage + 1)"
    )
      ck-icon(icon="arrow-right")
</template>

<script setup lang="ts">
import ckInput from '../../ck-input.vue';
import ckIcon from '../../ck-icon.vue';
</script>

<script lang="ts">
const itemsShowed = 5;
export default {
  name: 'CkTablePagination',
  props: {
    currentPage: { type: Number, required: true },
    align: { type: String, required: true },
    itemsPerPage: { type: Number, required: true },
    listLength: { type: Number, default: 0 },
  },
  emits: ['refreshList', 'update:currentPage'],
  computed: {
    currentPageLocal2: {
      get() { return this.currentPage; },
      set(val) {
        return;
      },
    },
    hasArrowLeft() {
      if (!this.listLeft.length) return false;
      return this.listLeft[0] !== 1;
    },
    totalPages() {
      return Math.ceil(this.listLength / this.itemsPerPage);
    },
    hasArrowRight() {
      if (!this.listRight.length) return false;
      return this.listRight[this.listRight.length -1] !== this.totalPages;
    },
    listLeft() {
      if (!this.listLength) return [];
      const list = [];
      const listLength = (itemsShowed - 1) / 2;
      for (const num of Array(listLength).keys()) {
        const listItem = this.currentPage - num - 1;
        if (listItem > 0) list.unshift(listItem);
      }
      return list;
    },
    listRight() {
      if (!this.listLength) return [];
      const list = [];
      const listLength = (itemsShowed - 1) / 2;
      for (const num of Array(listLength).keys()) {
        const listItem = this.currentPage + num + 1;
        if (listItem <= this.totalPages) list.push(listItem);
      }
      return list;
    },
  }, // computed
  methods: {
    // updateCurrentPage
    // validateInputNumber

    updateCurrentPage(val: number) {
      this.$emit('update:currentPage', val);
      this.$emit('refreshList', val);
    },
    validateInputNumber(val: number) {
      val = +val;
      if (val > this.totalPages) val = this.totalPages; 
      if (val < 1) val = 1; 
      if (val === this.currentPage) return;
      this.updateCurrentPage(val);
    },
  },
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../styles/index';
$itemSize = 40px
.ck-table__pagination-container
    display flex
    align-items center
    &.pagination-align--center
      justify-content center
    &.pagination-align--right
      justify-content flex-end
  .ck-table__pagination
    .ck-table__pagination-input
      margin-x $globalPadding 
    .ck-table__pagination-item,
    .ck-table__pagination--arrow-left,
    .ck-table__pagination--arrow-right
      display inline-flex
      align-items center
      justify-content center
      border-radius 100%
      width $itemSize
      height @width
      cursor pointer
    .ck-table__pagination-item
      background-color var(--primary)
      color white
      &.pagination-item__left
        margin-right ($globalPadding / 2)
      &.pagination-item__right
        margin-left ($globalPadding / 2)
    // arrow
    .ck-table__pagination--arrow-left,
    .ck-table__pagination--arrow-right
      border 1px solid var(--primary)
    .ck-table__pagination--arrow-left
      margin-right $globalPadding
    .ck-table__pagination--arrow-right
      margin-left $globalPadding
</style>