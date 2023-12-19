<script setup lang="ts">
// components
import CkTh from '../ck-th.vue';
// types
import type { Color } from '../../../types/cleek-options';
import type { ColumnItem } from '../../../types/table';

defineProps<{
  col: ColumnItem;
  // style
  textColor?: Color;
  backgroundColor?: Color;
}>();
</script>

<template>
<ck-th
  :align="col.align"
  :min-width="col.minWidth"
  :textColor="textColor"
  :backgroundColor="backgroundColor"
>
  {{ col.title }}
</ck-th>
</template>
