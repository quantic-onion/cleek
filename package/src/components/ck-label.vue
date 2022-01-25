<template lang="pug">
label.ck-label(
:for="for"
:class="computedClass"
)
  slot
</template>

<script>
export default {
  name: 'CkLabel',
  props: {
    for: { type: String, default: '' },
    align: { type: String, default: '' },
  },
  computed: {
    computedClass() {
      const list = [];
      // align
      let align = 'left';
      if (this.align === 'center' || this.align === 'right') align = this.align;
      list.push(`ck-align--${align}`);
      return list;
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
@require '../styles/ck-styles'

.ck-label
  width 100%
  padding-x 5px
  display flex
  font-size 13.5px
  &.ck-align--left
    justify-content flex-start
  &.ck-align--right
    justify-content flex-end
  &.ck-align--center
    justify-content center
</style>