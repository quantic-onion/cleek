<script setup lang="ts">
import { computed } from 'vue';
import CkLabel from './ck-label.vue';

const props = defineProps<{
  modelValue: string;
  // label
  label?: string;
  labelAlign?: 'left' | 'center' | 'right';
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const value = computed({
  get() { return props.modelValue; },
  set(val: string) { emits('update:modelValue', val); },
});
</script>

<template lang="pug">
.ck-textarea
  ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  textarea(v-model="value")
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
</style>