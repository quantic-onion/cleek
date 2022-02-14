<template lang="pug">
.ck-textarea
  ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  textarea(v-model="value")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ckLabel from './ck-label.vue';

const props = defineProps({
  modelValue: { },
  // label
  label: { type: String, default: '' },
  labelAlign: { type: String, default: '' },
});

const emits = defineEmits(['update:modelValue']);

const value = computed({
  get() { return props.modelValue; },
  set(val) { emits('update:modelValue', val); },
});
</script>

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