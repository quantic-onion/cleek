<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Align } from '@/cleek-options/cleek-options.types';

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
const currentStepGroup = computed(() => {
  if (props.maxStep === 1) return '';
  if (currentStep.value === 1) return 'left';
  if (currentStep.value === props.maxStep) return 'right';
  return 'center';
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

<template>
<div class="ck-pagination" :class="computedClass">
  <ck-button
    group="left"
    align="center"
    :width="currentStep === 1 ? '46px' : undefined"
    :icon="currentStep === 1 ? 'grip-lines-vertical' : 'arrow-left'"
    @click="goToPreviousStep()"
  />
  <!-- previous steps -->
  <ck-button v-if="currentStep - 2 >= 1" group="center" @click="currentStep = currentStep - 2">{{ currentStep - 2 }}</ck-button>
  <ck-button v-if="currentStep - 1 >= 1" group="center" @click="currentStep = currentStep - 1">{{ currentStep - 1 }}</ck-button>
  <!-- current step -->
  <ck-button
    type="filled"
    :group="currentStepGroup"
  >{{ currentStep }}</ck-button>
  <!-- next steps -->
  <ck-button v-if="currentStep + 1 <= maxStep" group="center" @click="currentStep = currentStep + 1">{{ currentStep + 1 }}</ck-button>
  <ck-button v-if="currentStep + 2 <= maxStep" group="center" @click="currentStep = currentStep + 2">{{ currentStep + 2 }}</ck-button>
  <!-- next button -->
  <ck-button
    group="right"
    align="center"
    :width="currentStep === maxStep ? '46px' : undefined"
    :icon="currentStep === maxStep ? 'grip-lines-vertical' : 'arrow-right'"
    @click="goToNextStep()"
  />
</div>
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
