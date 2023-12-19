<script setup lang="ts">
import { computed } from '@vue/runtime-core';

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', event: Event): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emits('update:modelValue', val);
  },
});
const checkboxAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});

function onChange(event: Event) {
  emits('change', event);
}
function onTrigger() {
  value.value = !value.value;
}
</script>

<template>
<label
  v-bind="checkboxAttributes"
  class="ck-checkbox"
  @keydown.space.prevent
  @keyup.enter="onTrigger()"
  @keyup.space="onTrigger()"
>
  <input
    class="ck-checkbox__input"
    aria-hidden="true"
    type="checkbox"
    :disabled="disabled"
    :checked="value"
    @change="value = $event.target.checked; onChange($event)"
  />
  <div class="ck-checkbox__element"/>
  <span v-if="$slots.default" class="c-Checkbox__label">
    <slot/>
  </span>
</label>
</template>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

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
