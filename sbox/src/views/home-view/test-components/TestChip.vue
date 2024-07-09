<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';
</script>

<template>
  <ContainerTest title="CHIP">
    <ck-chip
      v-for="color in allColors"
      :key="color"
      :color="color"
    >
      {{ color }}
    </ck-chip>
  </ContainerTest>
</template>