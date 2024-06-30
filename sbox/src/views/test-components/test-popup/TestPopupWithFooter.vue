<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const confirmButtonsDisplayed = ref(true);

const isActive = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
  },
});
</script>

<template>
  <ck-popup
    v-model="isActive"
    title="Popup with footer"
    :confirmButtons="confirmButtonsDisplayed"
  >
    <ck-switch v-model="confirmButtonsDisplayed">
      Mostrar confirmButtons también
    </ck-switch>
    <template #footer>
      Este es el footer
    </template>
  </ck-popup>
</template>