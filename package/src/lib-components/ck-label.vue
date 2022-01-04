<template lang="pug">
label.ck-label(
:class="computedClass"
)
  slot
</template>

<script>
export default {
  props: {
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
@require './styles/templateStyle'

.ck-label
  width 100%
  padding-x .5rem
  display flex
  margin-bottom .1rem
  font-size .85rem
  &.ck-align--left
    justify-content flex-start
  &.ck-align--right
    justify-content flex-end
  &.ck-align--center
    justify-content center
</style>