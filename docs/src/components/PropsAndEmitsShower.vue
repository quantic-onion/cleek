<script setup lang="ts">
import type { PropItem, EmitItem } from '@/props-and-emits';
import { propItemValuesByType } from '@/props-and-emits';

const props = defineProps<{
  propsList: PropItem[];
  emitsList: EmitItem[];
}>();

const columnsList = [
  'Property',
  'Type',
  'Description',
  'Default',
  'Values',
];

function getPropItemValues(propItem: PropItem) {
  let list = '';
  propItemValuesByType[propItem.type].forEach((value, index) => {
    if (index === 0) {
      list = value;
    } else {
      list = `${list}, ${value}`;
    }
  });
  return list;
}
</script>

<template lang="pug">
h1.mt-10.pb-2.pl-12 API
.props-and-emits-shower
  .props-list
    h3.pb-2.pl-2 Props
    .table-container
      ck-table(
      hideHeaderActions
      :columns="columnsList"
      )
        ck-tr(v-for="propItem in propsList")
          ck-td {{ propItem.property }}
          ck-td {{ propItem.type }}
          ck-td {{ propItem.description }}
          ck-td {{ propItem.default }}
          ck-td {{ getPropItemValues(propItem) }}
  .emits-list(v-if="emitsList.length")
    h3 Emits
    .table-container
      div(v-for="emitItem in emitsList")
        | {{ emitItem }}
</template>

<style lang="stylus">
.props-and-emits-shower
  background-color white
  padding 1.5rem 2rem
  border-radius .5rem
  margin-x 2rem
  .emits-list
    padding-top 1.5rem
  .table-container
    box-shadow 0 5px 10px 0 rgba(0 0 0 .15)
</style>