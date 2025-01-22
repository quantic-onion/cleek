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
      clickable
    >
      {{ color }}
    </ck-chip>
    <ck-chip group="left">left</ck-chip>
    <ck-chip group="center">center</ck-chip>
    <ck-chip group="right">right</ck-chip>
  </ContainerTest>
</template>