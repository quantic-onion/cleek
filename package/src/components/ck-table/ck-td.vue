<template lang="pug">
td.ck-td(
v-if="isColumnDisplayed"
:class="computedTdClass"
)
  span(:class="computedSpanClass" :style="computedStyle")
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import functions from '../../utils/functions';
import validators from '../../utils/validators';

const props = defineProps({
  col: { type: Object, default: undefined },
  nowrap: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  autoWidth: { type: Boolean, default: false },
  overflowAuto: { type: Boolean, default: false },
  align: { type: String, default: undefined, validator: validators.align },
  verticalAlign: { type: String, default: undefined, validator: validators.verticalAlign },
  fixedWidth: { type: String, default: '' }, // min and max width
  minWidth: { type: String, default: '' },
  maxWidth: { type: String, default: '' },
  maxHeight: { type: String, default: '' },
});

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
  const list = {};
  // min-width
  if (props.minWidth) list['min-width'] = props.minWidth;
  if (props.fixedWidth) list['min-width'] = props.fixedWidth;
  // max-width
  if (props.maxWidth) list['max-width'] = props.maxWidth;
  if (props.fixedWidth) list['max-width'] = props.fixedWidth;
  // max-height
  if (props.maxHeight) list['max-height'] = props.maxHeight;
  return list;
});
const isColumnDisplayed = computed(() => {
  if (!props.col) return true;
  return functions.isColumnDisplayed(props.col);
});
</script>

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