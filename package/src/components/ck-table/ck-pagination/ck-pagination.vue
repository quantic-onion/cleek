<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// types
import type { Align, Layout, ButtonType } from '@/cleek-options/cleek-options.types';

const props = defineProps<{
  modelValue: number;
  maxStep: number;
  align?: Align;
  btnLayout?: Layout;
  btnType?: ButtonType;
  iconArrowLeft?: string;
  iconDisableLeft?: string;
  iconArrowRight?: string;
  iconDisableRight?: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
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
const computedTypeBtn = computed(() => {
  const type = props.btnType || cleekOptions.value.button.type;
  if (type.toLowerCase() === 'filled') return 'outlined'
  return type;
})
const computedLayoutBtn = computed(() => {
  const layout = props.btnLayout || cleekOptions.value.styles.layout;
  return layout;
})

const currentStepGroup = computed(() => {
  if (props.maxStep === 1) return '';
  if (computedTypeBtn.value === 'flat') return '';
  return 'center';
});
const computedGroupArrowLeft = computed(() => {
  if (computedTypeBtn.value === 'flat') return '';
  return 'left';
});
const computedGroupArrowRight = computed(() => {
  if (computedTypeBtn.value === 'flat') return '';
  return 'right';
});
const computedIconLeft = computed(() => {
  if (currentStep.value === 1) {
    if (props.iconDisableLeft) return props.iconDisableLeft;
    return 'grip-lines-vertical';
  }
  if (props.iconArrowLeft) return props.iconArrowLeft;
  return 'arrow-left'
})
const computedIconRight = computed(() => {
  if (currentStep.value === props.maxStep ) {
    if (props.iconDisableRight) return props.iconDisableRight;
    return 'grip-lines-vertical';
  }
  if (props.iconArrowRight) return props.iconArrowRight;
  return 'arrow-right'
})

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
    width="42px"
    align="center"
    :group="computedGroupArrowLeft"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    :icon="computedIconLeft"
    @click="goToPreviousStep()"
  />
  <!-- previous steps -->
  <ck-button
    v-if="currentStep - 2 >= 1"
    width="42px"
    align="center"
    :group="currentStepGroup"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    @click="currentStep = currentStep - 2"
  >
    {{ currentStep - 2 }}
  </ck-button>
  <ck-button
    v-if="currentStep - 1 >= 1"
    width="42px"
    align="center"
    :group="currentStepGroup"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    @click="currentStep = currentStep - 1"
  >
    {{ currentStep - 1 }}
  </ck-button>
  <!-- current step -->
  <ck-button
    type="filled"
    width="42px"
    align="center"
    :group="currentStepGroup"
    :layout="computedLayoutBtn"
  >
    {{ currentStep }}
  </ck-button>
  <!-- next steps -->
  <ck-button
    v-if="currentStep + 1 <= maxStep"
    width="42px"
    align="center"
    :group="currentStepGroup"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    @click="currentStep = currentStep + 1"
  >
    {{ currentStep + 1 }}
  </ck-button>
  <ck-button
    v-if="currentStep + 2 <= maxStep"
    group="center"
    width="42px"
    align="center"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    @click="currentStep = currentStep + 2"
  >
    {{ currentStep + 2 }}
  </ck-button>
  <!-- arrow right -->
  <ck-button
    width="42px"
    align="center"  
    :group="computedGroupArrowRight"
    :type="computedTypeBtn"
    :layout="computedLayoutBtn"
    :icon="computedIconRight"
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
