<template lang="pug">
td.ck-td(v-if="isColumnDisplayed" :class="computedTdClass")
  //- default
  span(v-if="$slots.default" :class="computedSpanClass" :style="computedStyle")
    slot
  //- edit
  span.ck-td__slot-edit(
    v-if="$slots.edit && isEditingCol"
    :class="computedSpanClass"
    :style="computedStyle"
    @blur.capture="isEditingCol = false"
  )
    slot(name="edit")
  //- show
  span.ck-td__slot-show(
    v-if="$slots.show && !isEditingCol"
    :class="computedSpanClass"
    :style="computedStyle"
    @click="isEditingCol = true; setFocusChildren($event)"
  )
    slot(name="show")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import functions from '../../utils/global-hooks';

const props = defineProps({
  col: { type: Object, default: undefined },
  index: { type: Number, default: 0 },
  nowrap: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  autoWidth: { type: Boolean, default: false },
  overflowAuto: { type: Boolean, default: false },
  align: { type: String, default: undefined },
  fixedWidth: { type: String, default: '' }, // min and max width
  minWidth: { type: String, default: '' },
  maxWidth: { type: String, default: '' },
  maxHeight: { type: String, default: '' },
});

const isEditingCol = computed({
  get() {
    if (!props.col.isEditing) return false;
    return !!props.col.isEditing[props.index];
  },
  set(val) {
    if (!props.col.isEditing) props.col.isEditing = [];
    props.col.isEditing[props.index] = val;
  },
});

const computedTdClass = computed(() => {
  return {
    'auto-width': props.autoWidth,
    'overflow-auto': props.overflowAuto,
  };
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

function setFocusChildren(event) {
  const elShow = event.target;
  const elParent = elShow.parentElement;
  setTimeout(() => {
    const elEdit = elParent.children[0];
    const elEditContent = elEdit.children[0];
    if (elEditContent.setFocus) elEditContent.setFocus();
  }, 1);
}
</script>

<style lang="stylus" scoped>
.ck-td
  padding 0.5rem
  // border-bottom 1px solid $globalBorderColor
  background #fff
  .ck-td__slot-show
    cursor pointer
    background-color red
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
    &.no-wrap-text
      white-space nowrap
    &.block
      display block
</style>
