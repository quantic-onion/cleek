<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
  neverDisplay?: boolean;
};

const props = defineProps<{
  modelValue: boolean;
  columns?: object;
  columnsArray?: ColumnItem[];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

let columnsCheckable = ref<ColumnCheckableItem[]>([]);

const isActive = computed({
  get() { return props.modelValue; },
  set(val: boolean) { emits('update:modelValue', val); },
});

watch(() => isActive.value, (val) => {
  if (!val) return;
  setColumnsCheckable();
});
watch(() => isActive.value, (val) => {
  if (!val) return;
  setColumnsCheckable();
});

function setColumnsCheckable() {
  const list: ColumnCheckableItem[] = [];
  (props.columnsArray || []).forEach((col) => {
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

<template>
<ck-popup v-model="isActive" title="Administrador de columnas">
  <div class="columns-manger-container">
    <div
      v-for="(col, colIndex) in columnsCheckable"
      class="columns-manger__item"
      :key="colIndex"
    >
      <ck-checkbox
        v-model="col.value"
        @click="setColumnDisplayValue(col.name, col.value)"
      >
        {{ col.title }}
      </ck-checkbox>
    </div>
  </div>
</ck-popup>
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
  @media (max-width: 600px)
    max-height 68vh
</style>
