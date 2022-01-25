<template lang="pug">
.ck-input-text
  //- label
  ck-label(v-if="label" :align="labelAlign" for="ck-input-text") {{ label }}
  //- icon left
  ck-icon.ck-input__icon-left(
  v-if="icon"
  color="lightgrey"
  :icon="icon"
  :icon-pack="iconPack"
  )
  //- input
  input(
  v-model="value"
  type="text"
  :placeholder="placeholder"
  :class="computedClass"
  :id="label ? 'ck-input-text' : ''"
  )
  //- icon right
  ck-icon.ck-input__icon-right(
  v-if="iconRight"
  color="lightgrey"
  :icon="iconRight"
  :icon-pack="iconPack"
  )
</template>

<script setup lang="ts">
import ckLabel from './ck-label.vue';
import ckIcon from './ck-icon.vue';
</script>

<script lang="ts">
import functions from '../utils/functions.ts';
export default {
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    labelAlign: { type: String, default: '' },
    // icon
    icon: { type: [String, Array], default: undefined },
    iconPack: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
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
      // icon
      if (this.icon) classList.push('has-icon-left');
      if (this.iconRight) classList.push('has-icon-right');
      return classList;
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-input-text
  display inline-block
  position relative
  > input
    padding $globalPadding
    font-size $globalFontSize
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color $color-primary
    &.has-icon-left
      padding-left 14px + (3 * $globalPadding)
    &.has-icon-right
      padding-right 14px + (3 * $globalPadding)
  > .ck-input__icon-left,
  > .ck-input__icon-right
    position absolute
    bottom 13px
  > .ck-input__icon-left
    left 1.5 * $globalPadding
  > .ck-input__icon-right
    right 1.5 * $globalPadding
@require '../styles/ck-styles'
</style>