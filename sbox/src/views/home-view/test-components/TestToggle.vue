<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';
import { isIdentifier } from 'typescript';

const isNotSelected = ref(false);
const isSelected = ref(true);
const isFiltering = ref(true);
</script>

<template>
  <ContainerTest title="TOGGLE">
    <ck-toggle icon="user" v-model="isNotSelected">
      Inactivo
    </ck-toggle>
    <ck-toggle v-model="isSelected">
      Activo
    </ck-toggle>
    <ck-toggle v-if="isFiltering" v-model="isFiltering" iconRight="times">
      Filtro activado
    </ck-toggle>
  </ContainerTest>
</template>