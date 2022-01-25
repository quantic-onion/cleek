<template lang="pug">
.ck-table__header-items
  //- refresh btn
  ck-button(
  v-if="!refreshBtn"
  type="flat"
  icon="redo-alt"
  @click="$emit('refreshList')"
  )
  //- pages
  .items-per-page(
  v-if="!hideItemsPerPage"
  :class="{ 'ck-component__group--left': (!hideSearch) }"
  )
    | 1 - 20 de 38
  //- search
  ck-input-text(
  v-if="!hideSearch"
  v-model="searchLocal"
  placeholder="Buscar..."
  :group="hideItemsPerPage ? '' : 'right'"
  )
</template>

<script setup lang="ts">
import ckButton from '../ck-button.vue';
import ckInputText from '../ck-input-text.vue';
const searchLocal = 'holi';
</script>

<script lang="ts">
export default {
  // search: { type: String, required: true },
  props: {
    refreshBtn: { type: Boolean, required: true },
    hideItemsPerPage: { type: Boolean, required: true },
    hideSearch: { type: Boolean, required: true },
  },
  emits: ['refreshList', 'update:search'],
  // computed: {
  //   searchLocal: {
  //     get() { return this.search; },
  //     get(val) { this.$emit('update:search', val); }
  //   },
  // },
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../styles/ck-styles';
.ck-table__header-items
  display flex
  .items-per-page
    display flex
    align-items center
    padding-x 10px
    background-color rgba($globalBorderColor, .15)
    border 1px solid $globalBorderColor
    border-radius:  $globalBorderRadius
</style>