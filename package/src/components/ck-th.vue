<template lang="pug">
th.ck-th
  span(
  :class="computedSpanClass"
  :style="computedStyle"
  )
    slot
</template>

<script>
import validators from '../utils/validators';
export default {
  props: {
    align: { type: String, default: 'center', validator: validators.align },
    minWidth: { type: String, default: undefined },
  },
  computed: {
    computedSpanClass() {
      return {
        'align-center': this.align !== 'left' && this.align !== 'right',
        'align-left': this.align === 'left',
        'align-right': this.align === 'right',
      };
    },
    computedStyle() {
      const list = [];
      if (this.minWidth) list.push({ 'min-width': this.minWidth });
      return list;
    }
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
.ck-th
  > span
    display flex
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
