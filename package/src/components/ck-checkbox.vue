<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Color, Size } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

type Value = boolean | null;

const value = defineModel<Value>({ required: true });

const props = defineProps<{
  label?: string;
  disabled?: boolean;
  preventAutoUpdate?: boolean;
  color?: Color;
  colorText?: Color;
  size?: Size;
}>();

const emit = defineEmits<{
  change: [event: Event];
}>();

const checkboxAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});
const checkboxClass = computed(() => {
  const list = [];
  if (props.size) list.push(`size__${props.size}`);
  return list;
});
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
  if (props.preventAutoUpdate) return;
  value.value = !value.value;
}
</script>

<template>
  <label
    v-bind="checkboxAttributes"
    class="ck-checkbox"
    :class="checkboxClass"
    @keydown.space.prevent
    @keyup.enter="changeValue()"
    @keyup.space="changeValue()"
    @click.prevent="changeValue()"
  >
    <input
      class="ck-checkbox--input"
      :class="{ 'ck-checkbox--input__intermediate': value === null }"
      aria-hidden="true"
      type="checkbox"
      :disabled="disabled"
      :checked="value"
      @change="emit('change', $event)"
      @click.prevent
    />
    <div class="ck-checkbox--element" :class="elementClass" :style="elementStyle" @click.prevent />
    <span v-if="label" class="ck-checkbox--label" :class="labelClass" :style="labelStyle" v-text="label" @click.prevent />
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
  &.size__xs
    .ck-checkbox--element
      width 1rem
      height @width
      &::after
        transform rotate(45deg) scale(0.67)
        left 1px
        top -8px
  &.size__s
    .ck-checkbox--element
      width 1.25rem
      height @width
      &::after
        transform rotate(45deg) scale(0.9)
        left 1px
        top -6px
.ck-checkbox--element
  position relative
  display block
  height 24px
  width @height
  box-sizing border-box
  border 2px solid
  border-radius 4px
  border-color var(--primary)
  transition 0.15s
.ck-checkbox--label
  user-select none
  margin-left 8px

/* Checked */
.ck-checkbox--input:checked + .ck-checkbox--element::after
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
  box-sizing border-box

/* intermediate */
.ck-checkbox--input__intermediate + .ck-checkbox--element::after
  content ''
  display block
  position absolute
  top 50%
  left 50%
  height 3px
  width 10px
  transform translate(-50%, -50%)
  background-color white

/* Disabled */
.ck-checkbox[aria-disabled='true']
  cursor not-allowed
.ck-checkbox[aria-disabled='true'] .ck-checkbox--element
  border-color #757575
  background-color #e0e0e0
.ck-checkbox[aria-disabled='true']
  .ck-checkbox--input:checked
  + .ck-checkbox--element
    background-color #757575
  .ck-checkbox[aria-disabled='true'] .ck-checkbox--element::after
    border-color #757575
  .ck-checkbox[aria-disabled='true']
    .ck-checkbox--input:checked
    + .ck-checkbox--element::after
      border-color #e0e0e0
</style>
