<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const dateValue = ref(false);

const isPopupActive = computed({
  get() { return props.modelValue; },
  set(val) { emits('update:modelValue', val); },
});
</script>

<template>
  
<ck-popup v-model="isPopupActive" title="Test popup with input date">
  <ck-input-date v-model="dateValue"/>
</ck-popup>
</template>