<template lang="pug">
.ck-input-text
  //- label
  ck-label(v-if="label" :align="labelAlign") {{ label }}
  //- input
  input(
  v-model="value"
  type="text"
  :placeholder="placeholder"
  :class="computedClass"
  )
</template>

<script>
import functions from './functions.ts';

export default {
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    'label-align': { type: String, default: '' },
    // group
    group: { type: String, default: '' },
    groupBreak: { type: String, default: 's' },
    groupVertical: { type: String, default: '' },
  },
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
    computedClass() {
      const classList = [];
      // group
      classList.push(functions.getGroupClass(this));
      return classList;
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
json('./styles/StylusVars.json')

.ck-input-text
  display inline-block
  > input
    padding globalPadding
    font-size globalFontSize
    border-radius globalBorderRadius
    border 1px solid globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color primary

@require './styles/globalStyle'
</style>