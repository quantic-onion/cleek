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
  get() { return props.modelValue; },
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