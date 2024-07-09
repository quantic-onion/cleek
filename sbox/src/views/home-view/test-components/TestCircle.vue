<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';
</script>

<template>
  <ContainerTest title="CIRCLE">
    <ck-circle v-for="color in allColors" :key="color" :color="color">
      $
    </ck-circle>
  </ContainerTest>
</template>