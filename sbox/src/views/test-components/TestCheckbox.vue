<script setup lang="ts">
import { ref } from 'vue';
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
const values = ref({
  primary: true,
  secondary: true,
  success: false,
  warning: false,
  dark: false,
  light: false,
  purple: false,
});
</script>

<template>
  values {{ values }}
  <button @click="values.primary = !values.primary">
    TEST
  </button>
  <ContainerTest title="ICON">
    <div class="test-checkbox__container">
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