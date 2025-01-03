<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const optionsLoading = ref([])

const selectedOption = ref(null);

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    optionsLoading.value = [
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
    isLoading.value = false;
  }, 8000);
});
</script>

<template>
  <ContainerTest title="SELECT">
    <ck-select
      v-model="selectedOption"
      :options="optionsLoading"
      :isLoading="isLoading"
      label="Test isLoading"
      placeholder="Seleccione una opción"
    />
    <ck-select
      v-model="selectedOption"
      :options="options"
      placeholder="Seleccione una opción"
    />
    <ck-select
      v-model="selectedOption"
      :options="options"
      disabled
      label="Disabled"
      placeholder="Seleccione una opción"
    />
  </ContainerTest>
</template>