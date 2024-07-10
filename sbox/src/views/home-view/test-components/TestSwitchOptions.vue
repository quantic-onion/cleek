<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const options = [
  { id: true, name: 'Verdadero' },
  { id: false, name: 'Falso' },
];
const selectedValue = ref(true);
</script>

<template>
  <ContainerTest title="SWICH OPTIONS">
    <ck-switch-options v-model="selectedValue" :options="options" />
  </ContainerTest>
</template>
