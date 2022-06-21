<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// components
import CkLabel from './ck-label.vue';
// types
import type { Align, Color, CleekOptions, Layout } from '../types/cleek-options';
// hooks
import hooks from '../utils/functions';

const props = defineProps<{
  modelValue: string;
  // label
  label?: string;
  labelAlign?: Align;
  layout?: Layout;
  borderColor?: Color;
  placeholder?: string;
  disabled?: boolean;
  preventResize?: boolean;
  resize?: 'vertical' | 'horizontal';
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const value = computed({
  get() { return props.modelValue; },
  set(val: string) { emits('update:modelValue', val); },
});
const computedClassTextarea = computed(() => {
  const list = [];
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(layout);
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  return list;
});
const computedStyleTextarea = computed(() => {
  const list = [];
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles?.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // resize
  if (props.resize) list.push({ resize: props.resize || 'both' })
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template lang="pug">
.ck-textarea
  ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  textarea(
  v-model="value"
  :placeholder="placeholder"
  :disabled="disabled"
  :class="computedClassTextarea"
  :style="computedStyleTextarea"
  )
</template>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-textarea
  > textarea
    min-width 100%
    max-width 100%
    min-height 6rem
    box-sizing border-box
    font-family inherit
    padding $globalPadding
    // font-size $globalFontSize * (85/100)
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    &:focus-visible
      outline-color var(--primary)
    &.rounded
      border-radius 1.25rem
    &.squared
      border-radius 0
</style>