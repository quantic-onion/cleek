<template lang="pug">
button(
type="button"
:class="computedClass"
:title="title"
:aria-label="title"
:disabled="disabled"
@click="onClick($event)"
)
  slot
</template>

<script>
import validators from '../utils/validators';
import functions from '../utils/functions';
const defaults = { type: 'outlined' };
export default {
  name: 'CkButton',
  props: {
    title: { type: String, default: undefined },
    type: { type: String, default: defaults.type, validator: validators.buttonType },
    color: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    // icon
    icon: { type: [String, Array], default: undefined },
    iconPackage: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    // label
    label: { type: String, default: undefined },
    labelAlign: { type: String, default: undefined },
    // group
    group: { type: String, default: undefined, validator: validators.group },
    groupBreak: { type: String, default: 's' },
    groupVertical: { type: String, default: undefined, validator: validators.groupVertical  },
  },
  emits: ['click'],
  computed: {
    computedClass() {
      const classList = [];
      // group
      classList.push(functions.getGroupClass(this));
      // color
      if (this.color) {
        if (this.type === 'filled') {
          classList.push(`ck-component__bg-color--${this.color}`);
        } else {
          classList.push(`ck-component__border-color--${this.color}`);
        }
      }
      // type
      let type = this.type;
      if (!validators.buttonType(this.type)) type = defaults.type;
      classList.push(`type-${type}`)
      // if (this.size) classList.push(`rs-component-size__${this.size}`);
      return classList;
    },
  }, // computed
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

button
  cursor pointer
  display inline-flex
  align-items center
  height 32px
  padding 0 16px
  border-radius 4px
  position relative
  &::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    border-radius 4px
    z-index 1
    opacity 0
    transition opacity 0.15s ease-in-out
    background-color $primary
  &:hover::before
    opacity 0.1
  &:active::before
    opacity 0.2
  &.type-filled
    background-color $primary
    border 1px solid $primary
    color white
  &.type-outlined
    background-color transparent
    border 1px solid $primary
    color $primary
  &.type-text
    background-color transparent
    border none
    color $primary
  &.type-filled:disabled,
  &.type-outlined:disabled,
  &.type-text:disabled
    border-color #eeeeee
    background-color #eeeeee
    cursor not-allowed
  &:disabled::before
    display none
  &:disabled > span
    color $color-disabled
</style>
