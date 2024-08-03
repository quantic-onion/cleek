<script setup lang="ts">
import { computed } from 'vue';

type Option = { value: any; label: string };

const props = defineProps<{
  modelValue: string;
  name?: string;
  vertical?: boolean;
  classes?: string; // classes to add to any children
  options?: Option[];
  disabled?: boolean;
  // if not options
  value?: any;
  label?: any;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', event: Event): void;
  (e: 'click', event: Event): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emits('update:modelValue', val);
    emits('change', val);
  },
});
const radioAttributes = computed(() => {
  return {
    'aria-disabled': props.disabled,
    tabindex: props.disabled ? undefined : '0',
  };
});
const computedOptions = computed(() => {
  if (props.options) return props.options;
  if (typeof props.value !== undefined) {
    const label = props.label || props.value;
    return [{ value: props.value, label: label }];
  }
  return [];
});
const computedClass = computed(() => {
  const list = [];
  if (props.vertical) list.push('vertical');
  if (props.classes) list.push(props.classes);
  return list;
});

function handleChange(option: Option, event: Event) {
  option.value = value;
  emits('change', value);
}
</script>

<template>
<label
  v-for="(option, index) in computedOptions"
  class="ck-radio"
  :key="`radio-${index}`"
  v-bind="radioAttributes"
  :class="computedClass"
  @keydown.space.prevent
  @keyup.enter="handleChange(option, $event)"
  @keyup.space="handleChange(option, $event)"
>
  <input
    v-model="value"
    class="c-Radio__input"
    aria-hidden="true"
    type="radio"
    :name="name"
    :value="option.value"
    :disabled="disabled"
  />
  <div class="c-Radio__element"/>
  <span v-if="option.label" class="c-Radio__label">
    {{ option.label }}
  </span>
</label>
</template>

<style lang="stylus" scoped>
.ck-radio
  cursor pointer
  position relative
  display inline-flex
  align-items center
  width -moz-fit-content
  width fit-content
  &.vertical
    width 100%
  > input
    display none
.c-Radio__element
  position relative
  display block
  width 24px
  height 24px
  border 1px solid
  border-radius 24px
  border-color black
  flex-shrink 0
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
.ck-radio[aria-disabled='true']
  cursor not-allowed
.ck-radio[aria-disabled='true'] .c-Radio__element
  border-color #757575
  background-color #e0e0e0
.ck-radio[aria-disabled='true'] .c-Radio__element::after
  background-color #757575
</style>
