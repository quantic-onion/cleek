<script setup lang="ts">
import { computed } from '@vue/runtime-core';
// types
import type { Color, Size } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

type Value = boolean | null;

const value = defineModel<Value>({ required: true });

const props = defineProps<{
  label?: string;
  disabled?: boolean;
  color?: Color;
  colorText?: Color;
  size?: Size;
}>();

const emit = defineEmits<{
  change: [value: Value];
}>();

const elementClass = computed(() => {
  const list = [];
  if (props.color && hooks.isColorTemplateVariable(props.color)) {
    list.push(`component__border-color--${props.color}`);
    if (value.value) list.push(`component__color-background--${props.color}`);
  }
  return list;
});
const elementStyle = computed(() => {
  const list = [];
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    list.push({ borderColor: props.color });
    if (value.value) list.push({ backgroundColor: props.color });
  }
  return list;
});
const labelClass = computed(() => {
  const list = [];
  if (props.colorText && hooks.isColorTemplateVariable(props.colorText)) {
    list.push(`component__color--${props.colorText}`);
  }
  return list;
});
const labelStyle = computed(() => {
  const list = [];
  if (props.colorText && !hooks.isColorTemplateVariable(props.colorText)) {
    list.push({ color: props.colorText });
  }
  return list;
});

function changeValue() {
  const newValue = !value.value;
  value.value = newValue;
  emit('change', newValue);
}
</script>

<template>
  <label class="checkbox" :class="{ checkbox__disabled: disabled }">
    <input class="checkbox--input" type="checkbox" :checked="value" :disabled="disabled" @click="changeValue()" />
    <div class="checkbox--element" :class="elementClass" :style="elementStyle" />
    <span v-if="label" class="checkbox--label" :class="labelClass" :style="labelStyle" v-text="label" />
  </label>
</template>

<style lang="stylus" scoped>
.checkbox
  user-select none
  width fit-content
  flex(row, flex-start, center, 0.25rem)
  .checkbox--input
    height 0
    width 0
    &:checked + .checkbox--element
      background-color var(--primary)
    &:checked + .checkbox--element::after
      opacity 1
  .checkbox--element
    cursor pointer
    height 1.4rem
    width @height
    border 2px solid var(--primary)
    border-radius 0.25rem
    transition 0.15s
.checkbox__disabled
  .checkbox--element
    cursor not-allowed
    background-color #e0e0e0
    border-color #757575
</style>
