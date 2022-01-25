<template lang="pug">
.ck-table__header-items
  //- refresh btn
  ck-button(
  v-if="!refreshBtn"
  type="flat"
  icon="redo-alt"
  @click="$emit('refreshList', false)"
  )
  //- pages
  .items-per-page(
  v-if="!hideItemsPerPage && listLength"
  :class="{ 'ck-component__group--left': (!hideSearch) }"
  )
    | {{ currentPage }} - {{ currentPage * itemsPerPage }} de {{ listLength }}
  //- search
  ck-input-text(
  v-if="!hideSearch"
  v-model="searchLocal"
  icon="search"
  placeholder="Buscar..."
  :group="hideItemsPerPage ? '' : 'right'"
  @change="$emit('refreshList', false)"
  )
</template>

<script setup lang="ts">
import ckButton from '../ck-button.vue';
import ckInputText from '../ck-input-text.vue';
</script>

<script lang="ts">
export default {
  props: {
    search: { type: String, default: undefined, },
    refreshBtn: { type: Boolean, required: true },
    hideItemsPerPage: { type: Boolean, required: true },
    currentPage: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    listLength: { type: Number, required: true },
  },
  emits: ['refreshList', 'update:search'],
  computed: {
    searchLocal: {
      get() { return this.search; },
      set(val) { this.$emit('update:search', val); }
    },
    hideSearch() {
      return typeof this.searchLocal === 'undefined';
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../styles/ck-styles';
.ck-table__header-items
  display flex
  .items-per-page
    font-size $globalFontSize-s
    display flex
    align-items center
    padding-x 10px
    background-color rgba($globalBorderColor, .15)
    border 1px solid $globalBorderColor
    border-radius:  $globalBorderRadius
</style>