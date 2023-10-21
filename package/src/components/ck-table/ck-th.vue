<script setup lang="ts">
import { computed } from 'vue';
// hooks
import hooks from '../../utils/global-hooks';
// types
import type { Align, Color } from '../../types/cleek-options';

const props = defineProps<{
  align: Align; // default left
  minWidth: string;
  textColor?: Color;
  backgroundColor?: Color;
}>();

const defaultAlign = 'left';

const computedSpanClass = computed(() => {
  const list = [];
  // align
  list.push(`align-${props.align || defaultAlign}`)
  // textColor
  if (props.textColor && hooks.isColorTemplateVariable(props.textColor)) {
    list.push(`ck-component__color--${props.textColor}`);
  }
  // backgroundColor
  if (props.backgroundColor && hooks.isColorTemplateVariable(props.backgroundColor)) {
    list.push(`ck-component__bg-color--${props.backgroundColor}`);
  }
  return list;
});
const computedStyle = computed (() => {
  const list = [];
  // minWidth
  if (props.minWidth) list.push({ 'min-width': props.minWidth });
  // textColor
  if (props.textColor && !hooks.isColorTemplateVariable(props.textColor)) {
    list.push({ color: props.textColor || 'white' });
  }
  // backgroundColor
  if (props.backgroundColor && !hooks.isColorTemplateVariable(props.backgroundColor)) {
    list.push({ backgroundColor: props.backgroundColor });
  }
  return list;
});
</script>

<template lang="pug">
th.ck-th
  span(
  :class="computedSpanClass"
  :style="computedStyle"
  )
    slot
</template>

<style lang="stylus" scoped>
.ck-th
  vertical-align bottom
  > span
    display flex
    padding .5rem
    font-size .8rem
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
