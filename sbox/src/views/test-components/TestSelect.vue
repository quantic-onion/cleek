<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const options = [
  { id: 1, name: 'Lisandro' },
  { id: 2, name: 'Colo' },
  { id: 3, name: 'Dino' },
]
const selectedOption = ref(null);
</script>

<template>
  <ContainerTest title="SELECT">
    <ck-select
      v-model="selectedOption"
      :options="options"
      placeholder="Seleccione una opción"
    />
  </ContainerTest>
</template>