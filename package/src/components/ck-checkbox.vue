<script setup lang="ts">
import { computed, ref, watch } from '@vue/runtime-core';
// types
import type { Color } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  color?: Color;
  colorText?: Color;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', event: Event): void;
}>();

const isSelected = ref(props.modelValue);

const isChecked = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    isSelected.value = val;
    emits('update:modelValue', val);
  },
});
const checkboxAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});
const computedClass = computed(() => {
  const list = [];
  if (props.color && hooks.isColorTemplateVariable(props.color)) {
    list.push(`ck-component__border-color--${props.color}`);
    if (isSelected.value) {
      list.push(`ck-component__color-background--${props.color}`);
    }
  }
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    list.push({ borderColor: props.color });
    if (isSelected.value) {
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

watch(() => isChecked.value, (val) => {
  isSelected.value = val;
});

function onChange(event: Event) {
  isChecked.value = event.target.checked; 
  emits('change', event);
}
function onTrigger() {
  // isChecked.value = !isChecked.value;
}
</script>

<template>
  <label
    v-bind="checkboxAttributes"
    class="ck-checkbox"
    :class="{ 'is-selected': isChecked }"
    @keydown.space.prevent
    @keyup.enter="onTrigger()"
    @keyup.space="onTrigger()"
  >
    <input
      class="ck-checkbox__input"
      aria-hidden="true"
      type="checkbox"
      :disabled="disabled"
      :checked="isChecked"
      @change="onChange($event)"
      />
      <!-- @change="isChecked = $event.target.checked; onChange($event)" -->
    <div
      class="ck-checkbox__element"
      :class="computedClass"
      :style="computedStyle"
    />
    <span
      v-if="$slots.default"
      class="c-Checkbox__label"
      :class="computedClassLabel"
      :style="computedStyleLabel"
    >
      <slot/>
    </span>
  </label>
</template>

<style lang="stylus" scoped>
.ck-checkbox span
  margin-left 0.25rem
.ck-checkbox
  cursor pointer
  position relative
  display inline-flex
  align-items center
  width -moz-fit-content
  width fit-content

.ck-checkbox input
  display none

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
