<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Align } from '@/types/cleek-options';

const props = defineProps<{
  modelValue: number;
  maxStep: number;
  align?: Align;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const currentStep = computed({
  get() {
    return props.modelValue;
  },
  set(val: number) {
    emits('update:modelValue', val);
  },
});
const computedClass = computed(() => {
  const list = [];
  if (props.align) list.push(`align--${props.align}`);
  return list;
});

function goToPreviousStep() {
  if (currentStep.value <= 1) return;
  currentStep.value = currentStep.value - 1;
}
function goToNextStep() {
  if (currentStep.value >= props.maxStep) return;
  currentStep.value = currentStep.value + 1;
}
</script>
<template lang="pug">
.ck-pagination(:class="computedClass")
  ck-button(group="left" icon="arrow-left" @click="goToPreviousStep()")
  ck-button(
    v-for="stepNumber in maxStep"
    group="center"
    :type="currentStep === stepNumber ? 'filled' : 'outlined'"
    @click="currentStep = stepNumber"
  )
    | {{ stepNumber }}
  ck-button(group="right" icon="arrow-right" @click="goToNextStep()")
</template>

<style lang="stylus">
.ck-pagination
  width 100%
  display flex
  justify-content center
  &.align--left
    justify-content flex-start
  &.align--right
    justify-content flex-end
</style>
