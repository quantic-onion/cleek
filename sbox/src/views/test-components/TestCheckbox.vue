<script setup lang="ts">
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
</script>

<template>
  <ContainerTest title="ICON">
    <div class="test-checkbox__container">
      <div class="test-checkbox__row">
        <ck-checkbox v-for="color in allColors" :key="color" :color="color">
          {{ color }}
        </ck-checkbox>
      </div>
      <div class="test-checkbox__row">
        <ck-checkbox v-for="color in allColors" :key="color" :color="color" :colorText="color">
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