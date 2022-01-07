<template lang="pug">
.ck-textarea
  ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  textarea(v-model="value")
</template>

<script>
export default {
  props: {
    modelValue: { type: String, required: true },
    // label
    label: { type: String, default: '' },
    'label-align': { type: String, default: '' },
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
json('./styles/StylusVars.json')

.ck-textarea
  > textarea
    min-width 100%
    max-width 100%
    min-height 6rem
    box-sizing border-box
    font-family inherit
    padding globalPadding
    font-size globalFontSize * (85/100)
    border-radius globalBorderRadius
    border 1px solid globalBorderColor
    &:focus-visible
      outline-color primary
</style>