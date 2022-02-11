<template lang="pug">
.ck-table__header-items
  //- refresh btn
  ck-button(
  v-if="!hideRefreshBtn"
  type="flat"
  icon="redo-alt"
  @click="$emit('refreshList', false)"
  )
  //- pages
  .items-per-page(
  v-if="!hideItemsPerPage && listLength"
  :class="{ 'ck-component__group--left': (!hideSearch) }"
  )
    | {{ itemsPerPageStart }} - {{ itemsPerPageEnd }} de {{ listLength }}
  //- search
  ck-input(
  v-if="!hideSearch"
  v-model="searchLocal"
  icon="search"
  placeholder="Buscar..."
  :group="hideItemsPerPage ? '' : 'right'"
  @input="checkRefresh()"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ckButton from '../ck-button.vue';
import ckInput from '../ck-input.vue';
const props = defineProps({
  search: { type: String, default: undefined, },
  hideRefreshBtn: { type: Boolean, required: true },
  hideItemsPerPage: { type: Boolean, required: true },
  currentPage: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  listLength: { type: Number, required: true },
});
const emits = defineEmits(['update:search', 'refreshList']);


const searchLocal = computed({
  get() { return props.search; },
  set(val) { emits('update:search', val); }
});
const hideSearch = computed(() => {
  return typeof searchLocal.value === 'undefined';
});
const itemsPerPageStart = computed(() => {
  return (props.currentPage -1) * props.itemsPerPage + 1;
});
const itemsPerPageEnd = computed(() => {
  const value = props.currentPage * props.itemsPerPage;
  if (value > props.listLength) return props.listLength;
  return value;
});
function checkRefresh() {
  const search = searchLocal.value;
  setTimeout(() => {
    if (search !== searchLocal.value) return;
    emits('refreshList', false);
  }, 1000);
}
</script>

<style lang="stylus" scoped>
@import '../../styles/ck-styles';
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
</style>