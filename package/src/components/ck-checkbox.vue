<script setup lang="ts">
import { computed, ref, watch } from '@vue/runtime-core';
// types
import type { Color, Size } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const isChecked = defineModel<boolean | null>();

const props = defineProps<{
  // modelValue: boolean;
  label?: string;
  disabled?: boolean;
  color?: Color;
  colorText?: Color;
  size?: Size;
}>();

const emits = defineEmits<{
  // (e: 'update:modelValue', value: boolean): void;
  (e: 'change'): void;
}>();

// const isSelected = ref(props.modelValue);

// const isChecked = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(val: boolean) {
//     // isSelected.value = val;
//     emits('update:modelValue', val);
//   },
// });
const checkboxAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});
const computedClassContainer = computed(() => {
  const list = [];
  if (isChecked.value) list.push('is-selected');
  if (props.size) list.push(`size--${props.size}`);
  return list;
});
const computedClass = computed(() => {
  const list = [];
  if (props.color && hooks.isColorTemplateVariable(props.color)) {
    list.push(`ck-component__border-color--${props.color}`);
    if (isChecked.value) {
      list.push(`ck-component__color-background--${props.color}`);
    }
  }
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    list.push({ borderColor: props.color });
    if (isChecked.value) {
      list.push({ backgroundColor: props.color });
    }
  }
  return list;
});
const computedClassLabel = computed(() => {
  const list = [];
  if (props.colorText && hooks.isColorTemplateVariable(props.colorText)) {
    list.push(`ck-component__color--${props.colorText}`);
  }
  return list;
});
const computedStyleLabel = computed(() => {
  const list = [];
  if (props.colorText && !hooks.isColorTemplateVariable(props.colorText)) {
    list.push({ color: props.colorText });
  }
  return list;
});

// watch(() => isChecked.value, (val) => {
//   isSelected.value = val;
// });

function onTrigger() {
  // isChecked.value = !isChecked.value;
}
function updateValue() {
  isChecked.value = !isChecked.value;
  emits('change');
}
</script>

<template>
  <label
    v-bind="checkboxAttributes"
    class="ck-checkbox"
    :class="computedClassContainer"
    @keydown.space.prevent
    @keyup.enter="onTrigger()"
    @keyup.space="onTrigger()"
    @click.prevent="updateValue()"
  >
    <input
      class="ck-checkbox__input"
      aria-hidden="true"
      type="checkbox"
      :disabled="disabled"
      :checked="isChecked"
      @click.prevent
    />
      <!-- @change="isChecked = $event.target.checked; onChange($event)" -->
    <div
      class="ck-checkbox__element"
      :class="computedClass"
      :style="computedStyle"
      @click.prevent
    />
    <span
      v-if="$slots.default"
      class="c-Checkbox__label"
      :class="computedClassLabel"
      :style="computedStyleLabel"
      @click.prevent
    >
      <slot/>
    </span>
  </label>
</template>

<style lang="stylus" scoped>
.ck-checkbox
  cursor pointer
  position relative
  display inline-flex
  align-items center
  width -moz-fit-content
  width fit-content
  input
    display none
  span
    margin-left 0.25rem
  &.size--xs
    .ck-checkbox__element
      width 1rem
      height @width
      &::after
        transform rotate(45deg) scale(0.67)
        left 1px
        top -8px
  &.size--s
    .ck-checkbox__element
      width 1.25rem
      height @width
      &::after
        transform rotate(45deg) scale(0.9)
        left 1px
        top -6px

.ck-checkbox__element
  position relative
  display block
  width 24px
  height 24px
  border 2px solid
  border-radius 4px
  border-color var(--primary)
  transition 0.15s
  &.is-empty
    background-color transparent !important

.ck-checkbox__element::after
  content ''
  display block
  position absolute
  left 2px
  top -4px
  width 8px
  height 14px
  border-width 0 3px 3px 0
  border-style solid
  border-color white
  transform-origin bottom left
  transform rotate(45deg)
  opacity 0
  box-sizing border-box

.ck-checkbox__label
  user-select none
  margin-left 8px

/* Checked */

.ck-checkbox__input:checked + .ck-checkbox__element
  background-color var(--primary)

.ck-checkbox__input:checked + .ck-checkbox__element::after
  opacity 1

/* Disabled */

.ck-checkbox[aria-disabled='true']
  cursor not-allowed

.ck-checkbox[aria-disabled='true'] .ck-checkbox__element
  border-color #757575
  background-color #e0e0e0

.ck-checkbox[aria-disabled='true']
  .ck-checkbox__input:checked
  + .ck-checkbox__element
    background-color #757575

  .ck-checkbox[aria-disabled='true'] .ck-checkbox__element::after
    border-color #757575

  .ck-checkbox[aria-disabled='true']
    .ck-checkbox__input:checked
    + .ck-checkbox__element::after
      border-color #e0e0e0
</style>
