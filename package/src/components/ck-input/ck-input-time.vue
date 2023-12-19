<script setup lang="ts">
import { computed, ref } from 'vue';
import { qmDate } from 'quantic-methods';
import type { Ref } from 'vue';
// types
import type { Align, AlignVertical, WidthBreaks } from '../../types/cleek-options';

type stringTime = string | null;
type numberTime = number | undefined;

const props = defineProps<{
  modelValue: numberTime;
  label?: string;
  // group
  widthBreaks?: WidthBreaks;
  group?: Align;
  groupVertical?: AlignVertical;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: numberTime): void;
  (e: 'change', value: numberTime): void;
}>();

const inputValue = computed({
  get() {
    if (typeof props.modelValue !== 'number') return null;
    return qmDate.minToHour(props.modelValue);
  },
  set(val: stringTime) {
    emits('update:modelValue', +qmDate.hourToMin(val));
  },
});
</script>

<template>
<ck-input
  v-model="inputValue"
  type="time"
  :label="label"
  :group="group"
  :widthBreaks="widthBreaks"
  @change="emits('change', inputValue)"
/>
</template>
