<template lang="pug">
label.ck-switch(
v-bind="computedAttributes"
:class="computedClass"
@keydown.space.prevent
@keyup.enter="onTrigger()"
@keyup.space="onTrigger()"
)
  input.ck-switch__input(
  aria-hidden="true"  
  type="checkbox"
  v-model="value"
  :disabled="disabled"
  @click="onTrigger()"
  )
  .ck-switch__slider
  span.ck-switch__content(v-if="$slots.default")
    slot
</template>

<script>
export default {
  name: 'Switch',
  props: {
    modelValue: { type: Boolean, default: false },    
    disabled: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    squared: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
    computedClass() {
      const list = [];
      if (this.squared) list.push('is-squared');
      if (this.outlined) list.push('is-outlined');
      return list;
    },
    computedAttributes() {
      return {
        'aria-disabled': this.disabled,
        tabindex: this.disabled ? undefined : '0',
      }
    },
  }, // computed
  methods: {
    onTrigger() {
      this.value = !this.value;
    },
  }, // methods
}; // export default
</script>
<style lang="stylus" scoped>
@import '../styles/.variables.styl'
$height = 24px
$width = 48px
$height = 34px
$width = 60px
$transitionTime = 0.4s
$border-width = 2px

.ck-switch
  cursor pointer
  position relative
  display inline-flex
  align-items center
  width -moz-fit-content
  width fit-content
  input
    display none
  .ck-switch__slider
    position relative
    display block
    width $width
    height $height
    border $border-width solid $color-unset
    border-radius $height
    background-color white
    transition $transitionTime
    background-color $color-unset
    &:before
      content ''
      border-radius 50%
      position absolute
      position absolute
      height $height - (4 * $border-width)
      width $height - (4 * $border-width)
      left $border-width
      top $border-width
      background-color white
      transition $transitionTime
  .ck-switch__content
    user-select none
    margin-left 8px * $border-width

// outlined
.ck-switch.is-outlined
  .ck-switch__slider
    border-color $primary
    background-color white
    &:before
      background-color $primary

/* Checked */
.ck-switch__input:checked + .ck-switch__slider
  border-color $primary
  background-color $primary
.ck-switch__input:focus + .ck-switch__slider
  box-shadow 0 0 1px $primary
.ck-switch__input:checked + .ck-switch__slider:before
  background-color white
  transform translate($width - $height)

// squared
.ck-switch.is-squared .ck-switch__slider
  border-radius 0
  &:before
    border-radius 0
/* Disabled */
.ck-switch[aria-disabled='true']
  cursor not-allowed
  .ck-switch__slider
    border $border-width solid $color-disabled
    background-color $color-disabled-secondary
    &:before
      background-color $color-disabled
  .ck-switch__input:checked + .ck-switch__slider
    border $border-width solid $color-disabled
    background-color $color-disabled
    &:before
      background-color $color-disabled-secondary
</style>
