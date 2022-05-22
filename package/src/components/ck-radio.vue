<script setup lang="ts">
import { computed } from 'vue';

type Option = { value: any, label: string };

const props = defineProps<{
  modelValue: string;
  name?: string;
  options?: Option[];
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', event: Event): void;
}>();

const value = computed({
  get() { return props.modelValue; },
  set(val: string) { emits('update:modelValue', val); },
});
const radioAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  }
});

function handleChange(option: Option, event: Event) {
  option.value = value
  emits('change', event);
}
</script>

<template lang="pug">
template(
v-for="(option, index) in options"
:key="`radio-${index}`"
)
  label.c-Radio(
  v-bind="radioAttributes"
  @keydown.space.prevent
  @keyup.enter="handleChange(option, $event)"
  @keyup.space="handleChange(option, $event)"
  )
    input(
      v-model="value"
      aria-hidden="true"
      class="c-Radio__input"
      type="radio"
      :name="name"
      :value="option.value"
      :disabled="disabled"
    )
    .c-Radio__element
    span.c-Radio__label(v-if="option.label")
      | {{ option.label }}
</template>

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
