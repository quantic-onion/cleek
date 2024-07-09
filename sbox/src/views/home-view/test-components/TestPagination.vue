<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const currentPage = ref(1);
</script>

<template>
  <ContainerTest title="PAGINATION">
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
    />
  </ContainerTest>
</template>