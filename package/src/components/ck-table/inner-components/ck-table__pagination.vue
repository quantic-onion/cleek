<script setup lang="ts">
import { computed } from 'vue';
// components
import CkInput from '../../ck-input.vue';
import CkIcon from '../../ck-icon.vue';
// hooks
import functions from '../../../utils/functions';

const props = defineProps<{
  currentPage: number;
  align: 'left' | 'center' | 'right';
  itemsPerPage: number;
  listLength: number;
}>();

const emits = defineEmits<{
  (e: 'refreshList'): void;
  (e: 'update:currentPage', value: number): void;
}>();

const itemsShowed = 5;

const currentPageLocal2 = computed({
  get() { return props.currentPage; },
  set() {
    return;
  },
});
const hasArrowLeft = computed(() => {
  if (!listLeft.value.length) return false;
  return listLeft.value[0] !== 1;
});
const totalPages = computed(() => {
  return Math.ceil(props.listLength / props.itemsPerPage);
});
const hasArrowRight = computed(() => {
  if (!listRight.value.length) return false;
  return listRight.value[listRight.value.length -1] !== totalPages.value;
});
const listLeft = computed(() => {
  if (!props.listLength) return [];
  const list = [];
  const listLength = (itemsShowed - 1) / 2;
  for (const num of Array(listLength).keys()) {
    const listItem = props.currentPage - num - 1;
    if (listItem > 0) list.unshift(listItem);
  }
  return list;
});
const listRight = computed(() => {
  if (!props.listLength) return [];
  const list = [];
  const listLength = (itemsShowed - 1) / 2;
  for (const num of Array(listLength).keys()) {
    const listItem = props.currentPage + num + 1;
    if (listItem <= totalPages.value) list.push(listItem);
  }
  return list;
});

// updateCurrentPage
// validateInputNumber
function updateCurrentPage(val: number) {
  emits('update:currentPage', val);
  emits('refreshList');
}
function validateInputNumber(val: number) {
  val = +val;
  if (val > totalPages.value) val = totalPages.value; 
  if (val < 1) val = 1; 
  if (val === props.currentPage) return;
  updateCurrentPage(val);
}

functions.preventUnusedError([
  validateInputNumber,
]);
</script>

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