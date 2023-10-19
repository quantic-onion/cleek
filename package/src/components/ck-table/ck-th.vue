<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  align: 'left' | 'center' | 'right'; // default left
  minWidth: string;
}>();

const defaultAlign = 'left';

const computedSpanClass = computed(() => {
  const list = [];
  list.push(`align-${props.align || defaultAlign}`);
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  if (props.minWidth) list.push({ 'min-width': props.minWidth });
  return list;
});
</script>

<template lang="pug">
th.ck-th
  span(:class="computedSpanClass" :style="computedStyle")
    slot
</template>

<style lang="stylus" scoped>
.ck-th
  vertical-align bottom
  > span
    display flex
    padding 0.5rem
    font-size 0.8rem
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
