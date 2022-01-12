<template lang="pug">
.ck-textarea
  ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  textarea(v-model="value")
</template>

<script>
export default {
  name: 'CkTextarea',
  props: {
    modelValue: { type: String, required: true },
    // label
    label: { type: String, default: '' },
    labelAlign: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-textarea
  > textarea
    min-width 100%
    max-width 100%
    min-height 6rem
    box-sizing border-box
    font-family inherit
    padding $globalPadding
    // font-size $globalFontSize * (85/100)
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    &:focus-visible
      outline-color $primary
</style>