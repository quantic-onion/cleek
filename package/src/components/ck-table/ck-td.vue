<script setup lang="ts">
import { computed } from 'vue';
// hooks
import functions from '../../utils/functions';

type ColumnItem = {
  align?: 'left' | 'center' | 'right';
  isDisplayed?: boolean;
  unchangeable?: boolean;
}

const props = defineProps<{
  col?: ColumnItem;
  nowrap?: boolean;
  block?: boolean;
  overflowAuto?: boolean;
  // align
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'center' | 'bottom';
  // width
  fixedWidth?: string; // min and max width
  autoWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
}>();

const computedTdClass = computed(() => {
  const list = [];
  if (props.autoWidth) list.push('auto-width');
  if (props.overflowAuto) list.push('overflow-auto');
  if (props.verticalAlign) list.push(`vertical-align--${props.verticalAlign}`)
  return list;
});
const computedSpanClass = computed(() => {
  const list = [];
  // align
  let align;
  if (props.col) align = props.col.align;
  if (props.align) align = props.align;
  if (align) {
    if (align === 'center') list.push('align-center');
    if (align === 'right') list.push('align-right');
  }
  // block
  if (props.block) list.push('block');
  // nowrap
  if (props.block) list.push('no-wrap-text');
  return list;
});
const computedStyle = computed(() => {
  const list: {
    minWidth?: string;
    maxWidth?: string;
    maxHeight?: string;
  } = {};
  // min-width
  let minWidth = '';
  if (props.minWidth) minWidth = props.minWidth;
  if (props.fixedWidth) minWidth = props.fixedWidth;
  if (minWidth) list.minWidth = minWidth;
  // max-width
  let maxWidth = '';
  if (props.maxWidth) maxWidth = props.maxWidth;
  if (props.fixedWidth) maxWidth = props.fixedWidth;
  if (maxWidth) list.maxWidth = maxWidth;
  // max-height
  if (props.maxHeight) list.maxHeight = props.maxHeight;
  return list;
});
const isColumnDisplayed = computed(() => {
  if (!props.col) return true;
  return functions.isColumnDisplayed(props.col);
});

functions.preventUnusedError([
  isColumnDisplayed,
  computedStyle,
]);
</script>

<template lang="pug">
td.ck-td(
v-if="isColumnDisplayed"
:class="computedTdClass"
)
  span(:class="computedSpanClass" :style="computedStyle")
    slot
</template>

<style lang="stylus" scoped>
.ck-td
  padding .5rem
  border-bottom 1px solid $globalBorderColor
  background #fff
  &:last-of-type
    border none
  &.overflow-auto
    overflow auto
  &.auto-width
    width 1px
  > span
    display flex
    align-items center
    // &.align-left
    justify-content flex-start
    margin-right auto
    text-align left
    &.align-center
      justify-content center
      text-align center
      margin-x auto
    &.align-right
      justify-content flex-end
      text-align right
      margin-left auto
    &.vertical-align--top
      align-items flex-start
    &.vertical-align--bottom
      align-items flex-end
    &.no-wrap-text
      white-space nowrap
    &.block
      display block
</style>
