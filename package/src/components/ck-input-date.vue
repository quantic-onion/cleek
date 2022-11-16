<script setup lang="ts">
import { computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const date = computed({
  get() {
    const stringValue = `${props.modelValue}`;
    return `${stringValue.substring(0, 10)}T00:00:00`;
  },
  set(val: string) { emits('update:modelValue', val); },
});
</script>

<template lang="pug">
Datepicker(
v-model="date"
lang="es"
format="dd/MM/yyyy"
)
</template>