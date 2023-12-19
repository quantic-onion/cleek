<script setup lang="ts">
import { computed } from 'vue';
import type { Align, AlignVertical } from '../../types/cleek-options';
import type { ColumnItem } from '../../types/table';
// hooks
import hooks from '../../utils/global-hooks';

const props = defineProps<{
  col?: ColumnItem;
  nowrap?: boolean;
  block?: boolean;
  overflowAuto?: boolean;
  // align
  align?: Align;
  verticalAlign?: AlignVertical;
  // width
  fixedWidth?: string; // min and max width
  autoWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
}>();

const computedTdClass = computed(() => {
  const list = [];
  // autoWidth
  if (props.autoWidth || props.col?.autoWidth) list.push('auto-width');
  // overflowAuto
  if (props.overflowAuto || props.col?.overflowAuto) list.push('overflow-auto');
  // verticalAlign
  const verticalAlign = props.verticalAlign || props.col?.verticalAlign;
  if (verticalAlign) list.push(`vertical-align--${verticalAlign}`);
  return list;
});
const computedSpanClass = computed(() => {
  const list = [];
  // align
  const align = props.align || props.col?.align;
  if (align) {
    if (align === 'center') list.push('align-center');
    if (align === 'right') list.push('align-right');
  }
  // block
  if (props.block || props.col?.block) list.push('block');
  // nowrap
  if (props.nowrap || props.col?.nowrap) list.push('no-wrap-text');
  return list;
});
const computedStyle = computed(() => {
  const list: {
    minWidth?: string;
    maxWidth?: string;
    maxHeight?: string;
  } = {};
  // min-width
  let minWidth;
  if (props.minWidth || props.col?.minWidth) minWidth = props.minWidth || props.col?.minWidth;
  if (props.fixedWidth || props.col?.fixedWidth) minWidth = props.fixedWidth || props.col?.fixedWidth;
  if (minWidth) list.minWidth = minWidth;
  // max-width
  let maxWidth;
  if (props.maxWidth || props.col?.maxWidth) maxWidth = props.maxWidth || props.col?.maxWidth;
  if (props.fixedWidth || props.col?.fixedWidth) maxWidth = props.fixedWidth || props.col?.fixedWidth;
  if (maxWidth) list.maxWidth = maxWidth;
  // max-height
  if (props.maxHeight || props.col?.maxHeight) list.maxHeight = props.maxHeight;
  return list;
});
const isColumnDisplayed = computed(() => {
  if (!props.col) return true;
  return hooks.isColumnDisplayed(props.col);
});
</script>

<template>
<td v-if="isColumnDisplayed" :class="computedTdClass" class="ck-td">
  <span :class="computedSpanClass" :style="computedStyle">
    <slot/>
  </span>
</td>
</template>

<style lang="stylus" scoped>
.ck-td
  padding 0.5rem
  border-bottom 1px solid $globalBorderColor
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
