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
  .ck-switch__slider-container
    //- slider
    .ck-switch__slider
    //- icon-left
    ck-icon.ck-switch__icon-left(
    v-if="icon && value"
    :icon="icon"
    :icon-pack="iconPack"
    )
    //- icon-right
    ck-icon.ck-switch__icon-right(
    v-if="icon && !value"
    :icon="icon"
    :icon-pack="iconPack"
    )
  span.ck-switch__content(v-if="$slots.default")
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ckIcon from './ck-icon.vue';

const props = defineProps({
  modelValue: { type: [Boolean, Number], default: false },    
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  squared: { type: Boolean, default: false },
  // icon
  icon: { type: String, default: undefined },
  iconPack: { type: String, default: undefined },
});

const emits = defineEmits(['update:modelValue']);

const value = computed({
  get() { return props.modelValue; },
  set(val) { emits('update:modelValue', val); },
});
const computedClass = computed(() => {
  const list = [];
  if (props.squared) list.push('is-squared');
  if (props.outlined) list.push('is-outlined');
  return list;
});
const computedAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  }
});

function onTrigger() {
  value.value = !value.value;
}
</script>
<style lang="stylus" scoped>
@import '../styles/.variables.styl'
$height = 24px // s
$width = 48px // s
$height = 34px // m
$width = 60px // m
$height = 40px
$width = 70px
$transitionTime = 0.4s
$border-width = 2px // m
// $border-width = 4px
$ball-size = $height - (4 * $border-width)
.ck-switch
  cursor pointer
  position relative
  display inline-flex
  align-items center
  width -moz-fit-content
  width fit-content
  input
    display none
  .ck-switch__slider-container
    position relative
    .ck-switch__slider
      position relative
      display block
      box-sizing border-box
      width $width
      height $height
      border $border-width solid $color-lightgrey
      border-radius $height
      background-color white
      transition $transitionTime
      background-color $color-lightgrey
      &:before
        content ''
        border-radius 50%
        position absolute
        position absolute
        height $ball-size
        width $ball-size
        left $border-width
        top $border-width
        background-color white
        transition $transitionTime
  .ck-switch__content
    user-select none
    margin-left 8px
  .ck-switch__icon-left, .ck-switch__icon-right
    position absolute
    z-index 1
    top $border-width * 6
  .ck-switch__icon-left
    color white
    left $border-width * 6
  .ck-switch__icon-right
    color white
    right $border-width * 6

// outlined
.ck-switch.is-outlined
  .ck-switch__slider
    border-color var(--primary)
    background-color white
    &:before
      background-color var(--primary)
  .ck-switch__icon-right
    color var(--primary)

/* Checked */
.ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
  border-color var(--primary)
  background-color var(--primary)
.ck-switch__input:focus + .ck-switch__slider-container > .ck-switch__slider
  box-shadow 0 0 1px var(--primary)
.ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider:before
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
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
    border $border-width solid $color-disabled
    background-color $color-disabled
    &:before
      background-color $color-disabled-secondary
</style>
