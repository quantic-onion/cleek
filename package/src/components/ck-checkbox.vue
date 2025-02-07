<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Color, Size } from '../cleek-options/cleek-options.types';
// hooks
import hooks from '../utils/global-hooks';

type Value = boolean | null;

const value = defineModel<Value>({ required: true });

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    preventAutoUpdate?: boolean;
    color?: Color;
    colorText?: Color;
    size?: Size;
    textSize?: Size;
  }>(),
  {
    color: 'primary',
  },
);

const emit = defineEmits<{
  change: [event: Event];
}>();

const defaultTextSize = 'm';

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
    list.push(`ck-component__border-color--${props.color}`);
    if (value.value || value.value === null) list.push(`ck-component__color-background--${props.color}`);
  }
  return list;
});
const elementStyle = computed(() => {
  const list = [];
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    list.push({ borderColor: props.color });
    if (value.value || value.value === null) list.push({ backgroundColor: props.color });
  }
  return list;
});
const labelClass = computed(() => {
  const list = [];
  if (props.colorText && hooks.isColorTemplateVariable(props.colorText)) {
    list.push(`ck-component__color--${props.colorText}`);
  }
  // textSize
  if (props.textSize && props.textSize !== defaultTextSize) {
    list.push(`ck-checkbox--label-text-size--${props.textSize}`);
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
    <span v-if="label || $slots.default" class="ck-checkbox--label" :class="labelClass" :style="labelStyle" @click.prevent>
      <span v-if="label" v-text="label" />
      <slot />
    </span>
  </label>
</template>

<style lang="stylus" scoped>
.ck-checkbox
  user-select none
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
    .ck-checkbox--input:checked + .ck-checkbox--element::after
      transform rotate(45deg) scale(0.67)
      left 1px
      top -8px
  &.size__s
    .ck-checkbox--element
      width 1.25rem
      height @width
    .ck-checkbox--input:checked + .ck-checkbox--element::after
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
  transition 0.15s
.ck-checkbox--label
  margin-left 8px
  font-size 1rem
  &-text-size--xs
    font-size 0.65rem
  &-text-size--s
    font-size 0.85rem
  &-text-size--l
    font-size 1.2rem
  &-text-size--xl
    font-size 1.5rem

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

/* Intermediate */
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
