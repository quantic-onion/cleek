<script setup lang="ts">
import { ref } from 'vue';
import ComponentShower from '@/components/ComponentShower.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
import TableEditable from './components/TableEditable.vue';
import TableSimplest from './components/TableSimplest.vue';
import TableEmpty from './components/TableEmpty.vue';
import TableResponsive from './components/TableResponsive.vue';
import TableCommon from './components/TableCommon.vue';
import TableAlignment from './components/TableAlignment.vue';
import TableDynamicColumns from './components/TableDynamicColumns.vue';
// data
import { propsAndEmits } from '@/props-and-emits'
</script>

<template lang="pug">
ComponentShower
  TableEditable
ComponentShower(title="Table Simplest")
  TableSimplest
ComponentShower(title="Table Empty")
  TableEmpty
ComponentShower(title="Table responsive")
  TableResponsive
ComponentShower
  TableCommon
ComponentShower(title="Alignment")
  TableAlignment
ComponentShower(title="Dynamic columns")
  TableDynamicColumns
  
PropsAndEmitsShower(
:propsList="propsAndEmits.table.props"
:emitsList="propsAndEmits.table.emits"
)
</template>