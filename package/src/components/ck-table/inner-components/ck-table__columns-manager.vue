<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
// components
import CkCheckbox from '../../ck-checkbox.vue';
import CkPopup from '../../ck-popup.vue';
// hooks
import functions from '../../../utils/global-hooks';
// types
import type { ColumnItem } from '../../../types/table';

type ColumnCheckableItem = {
  name: string;
  title: string;
  value: boolean;
}

const props = defineProps<{
  modelValue: boolean;
  columns?: object;
  columnsArray?: ColumnItem[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

let columnsCheckable: Ref<ColumnCheckableItem[]> = ref([]);

const isActive = computed({
  get() { return props.modelValue; },
  set(val: boolean) { emits('update:modelValue', val); },
});

watch(() => isActive.value, (val) => {
  if (!val) return;
  setColumnsCheckable();
});

function setColumnsCheckable() {
  const list: ColumnCheckableItem[] = [];
  (props.columnsArray || []).forEach(col => {
    if (!col.unchangeable) {
      list.push({
        name: col.name,
        title: col.title,
        value: functions.isColumnDisplayed(col),
      });
    }
  });
  columnsCheckable.value = list;
}

function setColumnDisplayValue(colName: string, value: any) {
  // @ts-ignore
  props.columns[colName].isDisplayed = value;
}
</script>

<template lang="pug">
ck-popup(
v-model="isActive"
title="Administrador de columnas"
)
  .columns-manger-container
    .columns-manger__item(v-for="col in columnsCheckable")
      ck-checkbox(
      v-model="col.value"
      @change="setColumnDisplayValue(col.name, col.value)"
      )
        | {{ col.title }}
</template>

<style lang="stylus" scoped>
.columns-manger-container
  padding-top 1.5rem
  padding-x 2rem
  padding-bottom 1rem
  max-height 60vh
  overflow-y auto
  .columns-manger__item
    display flex
    align-items center
    margin-bottom 1rem
  @media(max-width 600px)
    max-height 68vh
</style>