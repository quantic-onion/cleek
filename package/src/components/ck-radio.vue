<template lang="pug">
template(
v-for="(item, index) in options"
:key="`radio-${index}`"
)
  label.c-Radio(
  v-bind="radioAttributes"
  @keydown.space.prevent
  @keyup.enter="handleChange(item.value)"
  @keyup.space="handleChange(item.value)"
  )
    input(
      v-model="value"
      aria-hidden="true"
      class="c-Radio__input"
      type="radio"
      :name="name"
      :value="item.value"
      :disabled="disabled"
    )
    .c-Radio__element
    span.c-Radio__label(v-if="item.label")
      | {{ item.label }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import validators from '../utils/validators';
const props = defineProps({
  modelValue: { type: String, default: undefined },
  name: { type: String, required: true },
  options: { type: Array, required: true, validator: validators.radioOptions },
  disabled: { type: Boolean, default: false },
});

const emits = defineEmits(['update:modelValue', 'change']);

const value = computed({
  get() { return props.modelValue; },
  set(val) { emits('update:modelValue', val); },
});
const radioAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  }
});

function handleChange(value) {
  value.value = value
  emits('change', value);
}
</script>

<style lang="stylus" scoped>
.c-Radio
  cursor pointer
  position relative
  display flex
  align-items center
  width -moz-fit-content
  width fit-content
.c-Radio + .c-Radio
  margin-top 8px
.c-Radio input
  display none
.c-Radio__element
  position relative
  display block
  width 24px
  height 24px
  border 1px solid
  border-radius 24px
  border-color black
.c-Radio__element::after
  content ''
  display block
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 16px
  height 16px
  border-radius 16px
  background-color black
  opacity 0
  transition 0.15s
.c-Radio__input:checked + .c-Radio__element::after
  opacity 1
.c-Radio__label
  user-select none
  margin-left 8px

// Disabled
.c-Radio[aria-disabled='true']
  cursor not-allowed
.c-Radio[aria-disabled='true'] .c-Radio__element
  border-color #757575
  background-color #e0e0e0
.c-Radio[aria-disabled='true'] .c-Radio__element::after
  background-color #757575
</style>
