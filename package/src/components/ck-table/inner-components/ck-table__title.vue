<script setup lang="ts">
// components
import CkTh from '../ck-th.vue';
// types
import type { ColumnItem } from '../../../types/table';

defineProps<{
  col: ColumnItem;
}>();
</script>

<template lang="pug">
ck-th(:align='col.align', :min-width='col.minWidth')
  | {{ col.title }}
</template>
