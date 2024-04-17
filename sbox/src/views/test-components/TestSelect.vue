<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { id: 1, name: 'Lisandro' },
  { id: 2, name: 'Colo' },
  { id: 3, name: 'Dino' },
]
const selectedOption = ref(null);
</script>

<template>
  ESTE ES EL TEST DE LOS SELECTS
<ck-select
  v-model="selectedOption"
  :options="options"
  placeholder="Seleccione una opción"
/>
</template>