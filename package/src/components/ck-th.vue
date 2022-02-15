<template lang="pug">
th.ck-th
  span(
  :class="computedSpanClass"
  :style="computedStyle"
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import validators from '../utils/validators';

const props = defineProps({
  align: { type: String, default: 'center', validator: validators.align },
  minWidth: { type: String, default: undefined },
});

const computedSpanClass = computed(() => {
  return {
    'align-center': props.align !== 'left' && props.align !== 'right',
    'align-left': props.align === 'left',
    'align-right': props.align === 'right',
  };
});
const computedStyle = computed (() => {
  const list = [];
  if (props.minWidth) list.push({ 'min-width': props.minWidth });
  return list;
});
</script>

<style lang="stylus" scoped>
.ck-th
  vertical-align bottom
  > span
    display flex
    padding .5rem
    &.align-center
      justify-content center
      margin-x auto
    &.align-left
      justify-content flex-start
      margin-right auto
    &.align-right
      justify-content flex-end
      margin-left auto
</style>
