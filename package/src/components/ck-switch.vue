<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Icon, IconPack, Size } from '../types/cleek-options';
// computed
import CkIcon from './ck-icon.vue';

type ModelValue = boolean | 1 | 0;

const props = defineProps<{
  modelValue: ModelValue;
  preventAutoUpdate?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  squared?: boolean;
  size?: Size;
  // icon
  icon?: Icon;
  iconPack?: IconPack;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
  (e: "click"): void;
}>();

const defaultSize = 's';

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val: ModelValue) {
    emits('update:modelValue', val);
  },
});

const computedClass = computed(() => {
  const list = [];
  if (props.squared) list.push('is-squared');
  if (props.outlined) list.push('is-outlined');
  // size
  let size = props.size || defaultSize;
  list.push(`ck-switch--size-${size}`);
  return list;
});
const computedAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});
const iconClass = computed(() => {
  const list = [];
  if (props.size && props.size !== defaultSize) {
    list.push(`ck-switch__icon-size--${props.size}`);
  }
  return list;
});

function handleSwitchClick(e: Event) {
  if (props.preventAutoUpdate) {
    e.preventDefault();
    e.stopPropagation();
    emits('click');
  }
}
</script>

<template lang="pug">
label.ck-switch(v-bind='computedAttributes', :class='computedClass', @keydown.space.prevent)
  input.ck-switch__input(
    type='checkbox',
    v-model='value',
    aria-hidden='true',
    :disabled='disabled',
    @click='handleSwitchClick($event)'
  )
  .ck-switch__slider-container
    //- slider
    .ck-switch__slider
    //- icon-left
    ck-icon.ck-switch__icon-left(v-if='icon && value', :icon='icon', :icon-pack='iconPack', :class='iconClass')
    //- icon-right
    ck-icon.ck-switch__icon-right(v-if='icon && !value', :icon='icon', :icon-pack='iconPack', :class='iconClass')
  span.ck-switch__content(v-if='$slots.default')
    slot
</template>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'
$transitionTime = 0.4s

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
    display flex
    align-items center
    position relative
    transition $transitionTime
    .ck-switch__slider
      position relative
      display block
      box-sizing border-box
      border 0px solid $color-lightgrey
      background-color white
      transition $transitionTime
      background-color $color-lightgrey
      &:before
        content ''
        border-radius 50%
        position absolute
        position absolute
        background-color white
        transition $transitionTime
  .ck-switch__content
    user-select none
    margin-left 5px
  .ck-switch__icon-left
  .ck-switch__icon-right
    position absolute
    z-index 1
    font-size 0.65rem
    color white

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

// squared
.ck-switch.is-squared .ck-switch__slider
  border-radius 0 !important
  &:before
    border-radius 0 !important
/* Disabled */
.ck-switch[aria-disabled='true']
  cursor not-allowed
  .ck-switch__slider
    border 0px solid $color-disabled
    background-color $color-disabled-secondary
    &:before
      background-color $color-disabled
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
    border 0px solid $color-disabled
    background-color $color-disabled
    &:before
      background-color $color-disabled-secondary












// size S
.ck-switch.ck-switch--size-s
  $height = 22px
  $width = 42px
  $border-width = 1px
  $icon-size = 0.8rem
  $icon-distance = 8px
  $ball-size = $height - 4 * $border-width
  .ck-switch__slider-container
    .ck-switch__slider
      width $width
      height $height
      border-width $border-width
      border-radius $height
      &:before
        height $ball-size
        width $ball-size
        left $border-width
        top $border-width
  .ck-switch__icon-left
    font-size $icon-size
    left $icon-distance
  .ck-switch__icon-right
    font-size $icon-size
    right $icon-distance
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider:before
    transform translate($width - $height)
  /* Disabled */
  &[aria-disabled='true']
    .ck-switch__slider
      border-width $border-width
    .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
      border-width $border-width


// size XS
.ck-switch.ck-switch--size-xs
  $height = 14px
  $width = 24px
  $border-width = 1px
  $icon-size = 0.5rem
  $icon-distance = 4px
  $ball-size = $height - 4 * $border-width
  .ck-switch__slider-container
    .ck-switch__slider
      width $width
      height $height
      border-width $border-width
      border-radius $height
      &:before
        height $ball-size
        width $ball-size
        left $border-width
        top $border-width
  .ck-switch__icon-left
    font-size $icon-size
    left $icon-distance
  .ck-switch__icon-right
    font-size $icon-size
    right $icon-distance
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider:before
    transform translate($width - $height)
  /* Disabled */
  &[aria-disabled='true']
    .ck-switch__slider
      border-width $border-width
    .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
      border-width $border-width




// size M
.ck-switch.ck-switch--size-m
  $height = 34px
  $width = 65px
  $border-width = 2px
  $icon-size = 1.1rem
  $icon-distance = 12px
  $ball-size = $height - 4 * $border-width
  .ck-switch__slider-container
    .ck-switch__slider
      width $width
      height $height
      border-width $border-width
      border-radius $height
      &:before
        height $ball-size
        width $ball-size
        left $border-width
        top $border-width
  .ck-switch__icon-left
    font-size $icon-size
    left $icon-distance
  .ck-switch__icon-right
    font-size $icon-size
    right $icon-distance
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider:before
    transform translate($width - $height)
  /* Disabled */
  &[aria-disabled='true']
    .ck-switch__slider
      border-width $border-width
    .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
      border-width $border-width



// size L
.ck-switch.ck-switch--size-l
  $height = 45px
  $width = 90px
  $border-width = 2px
  $icon-size = 1.5rem
  $icon-distance = 14px
  $ball-size = $height - 4 * $border-width
  .ck-switch__slider-container
    .ck-switch__slider
      width $width
      height $height
      border-width $border-width
      border-radius $height
      &:before
        height $ball-size
        width $ball-size
        left $border-width
        top $border-width
  .ck-switch__icon-left
    font-size $icon-size
    left $icon-distance
  .ck-switch__icon-right
    font-size $icon-size
    right $icon-distance
  .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider:before
    transform translate($width - $height)
  /* Disabled */
  &[aria-disabled='true']
    .ck-switch__slider
      border-width $border-width
    .ck-switch__input:checked + .ck-switch__slider-container > .ck-switch__slider
      border-width $border-width
</style>
