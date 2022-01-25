<template lang="pug">
.ck-input-text
  //- label
  ck-label(v-if="label" :align="labelAlign" for="ck-input-text") {{ label }}
  //- input
  input(
  :id="label ? 'ck-input-text' : ''"
  v-model="value"
  type="text"
  :placeholder="placeholder"
  :class="computedClass"
  )
</template>

<script>
import functions from '../utils/functions.ts';
import ckLabel from './ck-label.vue';

export default {
  name: 'CkInputText',
  components: {
    ckLabel,
  },
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    labelAlign: { type: String, default: '' },
    // group
    group: { type: String, default: '' },
    groupBreak: { type: String, default: 's' },
    groupVertical: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
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
@import '../styles/.variables.styl'

.ck-input-text
  display inline-block
  > input
    padding $globalPadding
    font-size $globalFontSize
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color $primary

@require '../styles/ck-styles'
</style>