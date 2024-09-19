<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';

const isSelected = ref(false);
</script>

<template>
  <ContainerTest title="TOGGLE">
    <ck-toggle icon="user" v-model="isSelected">
      Mostrar eliminados
    </ck-toggle>
    <ck-toggle v-model="isSelected">
      Mostrar eliminados
    </ck-toggle>
  </ContainerTest>
</template>