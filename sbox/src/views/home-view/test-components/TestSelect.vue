<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const options = [
  { id: 1, name: 'Lisandro' },
  { id: 2, name: 'Colo' },
  { id: 3, name: 'Dino' },
  { id: 4, name: 'Juan' },
  { id: 5, name: 'Carlos' },
  { id: 6, name: 'Clara' },
  { id: 7, name: 'Juana' },
  { id: 8, name: 'Clarita' },
  { id: 9, name: 'Clara Ana' },
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
    <ck-select
      v-model="selectedOption"
      :options="options"
      disabled
      placeholder="Seleccione una opción"
    />
  </ContainerTest>
</template>