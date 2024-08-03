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
    title="Popup giant"
    confirmButtons
  >
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <div class="content-item">Item</div>
    <template #footer>
      Este es el footer
    </template>
  </ck-popup>
</template>

<style lang="stylus" scoped>
.content-item
  padding 1rem
  font-size 1.5rem
</style>