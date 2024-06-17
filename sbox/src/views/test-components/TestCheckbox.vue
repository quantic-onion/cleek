<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const allColors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'dark',
  'light',
  'purple',
];
const isDisplayingCheckbox = ref(true);
const values = ref({
  primary: true,
  secondary: true,
  success: false,
  warning: false,
  dark: false,
  light: false,
  purple: false,
});

watch(values, async () => {
  isDisplayingCheckbox.value = false;
  await nextTick(); // this is to fix a cleek problem when updating the value from outside
  isDisplayingCheckbox.value = true;
}, { deep: true });
</script>

<template>
  <ContainerTest title="ICON">
    <div v-if="isDisplayingCheckbox" class="test-checkbox__container">
      <div class="test-checkbox__row">
        <ck-checkbox v-for="color in allColors" :key="color" :color="color" v-model="values[color]">
          {{ color }}
        </ck-checkbox>
      </div>
      <div class="test-checkbox__row">
        <ck-checkbox v-for="color in allColors" :key="color" :color="color" :colorText="color" v-model="values[color]">
          {{ color }}
        </ck-checkbox>
      </div>
    </div>
  </ContainerTest>
</template>

<style lang="stylus" scoped>
.test-checkbox__container
  display flex
  flex-direction column
  gap 1rem
  .test-checkbox__row
    display flex
    gap 0.5rem
</style>