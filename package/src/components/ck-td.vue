<template lang="pug">
td.ck-td(:class="computedTdClass")
  span(:class="computedSpanClass" :style="computedStyle")
    slot
</template>

<script>
import validators from '../utils/validators';
export default {
  props: {
    wrap: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    autoWidth: { type: Boolean, default: false },
    align: { type: String, default: 'center', validator: validators.align },
    fixedWidth: { type: String, default: '' }, // min and max width
    minWidth: { type: String, default: '' },
    maxWidth: { type: String, default: '' },
    maxHeight: { type: String, default: '' },
  },
  computed: {
    computedTdClass() {
      return {
        'auto-width': this.autoWidth,
      };
    },
    computedSpanClass() {
      return {
        block: this.block,
        'wrap-text': this.wrap,
        'align-center': this.align !== 'left' && this.align !== 'right',
        'align-left': this.align === 'left',
        'align-right': this.align === 'right',
      };
    },
    computedStyle() {
      const list = {};
      // min-width
      if (this.minWidth) list['min-width'] = this.minWidth;
      if (this.fixedWidth) list['min-width'] = this.fixedWidth;
      // max-width
      if (this.maxWidth) list['max-width'] = this.maxWidth;
      if (this.fixedWidth) list['max-width'] = this.fixedWidth;
      // max-height
      if (this.maxHeight) list['max-height'] = this.maxHeight;
      return list;
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
.ck-td
  padding .5rem
  overflow auto
  border-bottom 1px solid $globalBorderColor
  background #fff
  &:last-of-type
    border none
  &.block
    display block
  &.auto-width
    width 1px
  > span
    display flex
    white-space nowrap
    &.align-center
      justify-content center
      margin-x auto
    &.align-left
      justify-content flex-start
      margin-right auto
    &.align-right
      justify-content flex-end
      margin-left auto
    &.wrap-text
      white-space unset
</style>
