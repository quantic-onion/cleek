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

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import functions from '../../utils/functions';
import ckCheckbox from '../ck-checkbox.vue';
import ckPopup from '../ck-popup.vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  columns: { type: Object, required: true },
  columnsArray: { type: Array, required: true },
});

const emits = defineEmits(['update:modelValue']);

let columnsCheckable = ref([]);

const isActive = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  }
});

watch(() => isActive.value, (val) => {
  if (!val) return;
  setColumnsCheckable();
});

function setColumnsCheckable() {
  console.log('hoola');
  const list = [];
  props.columnsArray.forEach(col => {
    const value = functions;
    if (functions)
    list.push({
      name: col.name,
      title: col.title,
      value: functions.isColumnDisplayed(col),
    })
  });
  columnsCheckable.value = list;
}

function setColumnDisplayValue(colName, value) {
  props.columns[colName].isDisplayed = value;
}
</script>

<style lang="stylus" scoped>
.columns-manger-container
  padding-top 1.5rem
  padding-left 2rem
  padding-bottom 1rem
  .columns-manger__item
    display flex
    align-items center
    margin-bottom 1rem
</style>