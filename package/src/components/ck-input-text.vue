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
  :class="computedClassInput"
  :style="computedStyleInput"
  :id="label ? 'ck-input-text' : ''"
  @change="onChange($event)"
  @click="onClick($event)"
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
import validators from '../utils/validators.ts';
export default {
  props: {
    // CORREGIR "NUMBER"
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    // label
    label: { type: String, default: '' },
    labelAlign: { type: String, validator: validators.align, default: undefined },
    // icon
    icon: { type: [String, Array], default: undefined },
    iconPack: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    // group
    group: { type: String, default: '' },
    groupBreak: { type: String, default: 's' },
    groupVertical: { type: String, default: '' },
    // style
    hideBorder: { type: Boolean, default: false },
    width: { type: String, default: undefined },
    align: { type: String, validator: validators.align, default: undefined },
    // functions
    autoSelect: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change', 'click'],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
    computedStyleInput() {
      const list = [];
      // width
      if (this.width) list.push({ width: this.width });
      return list;
    },
    computedClassInput() {
      const list = [];
      // group
      list.push(functions.getGroupClass(this));
      // icon
      if (this.icon) list.push('has-icon-left');
      if (this.iconRight) list.push('has-icon-right');
      // align
      if (this.align) list.push(`align--${this.align}`);
      // hideBorder
      if (this.hideBorder) list.push('no-border');
      return list;
    },
  }, // computed
  methods: {
    // onChange
    // onClick

    onChange(event) {
      this.$emit('change', event);
    },
    onClick(event) {
      console.log('autoSelect', this.autoSelect);
      console.log('event', event);
      if (this.autoSelect) event.target.select();
      this.$emit('click', event);
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-input-text
  display inline-block
  position relative
  > input
    padding $globalPadding
    font-size $globalFontSize-s
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color $color-primary
    &.align--center
      text-align center
    &.align--right
      text-align right
    &.no-border
      border-color transparent
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