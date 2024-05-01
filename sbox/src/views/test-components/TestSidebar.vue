<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const isSidebarActive = ref(false);
const isLoading = ref(false);

function closeWithLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3 * 1000 * 10);
}
</script>

<template>
  <ContainerTest title="SIDEBAR">
    <ck-button @click="isSidebarActive = true">
      Open sidebar
    </ck-button>
  </ContainerTest>
  <ck-sidebar
    v-model="isSidebarActive"
    :isLoading="isLoading"
    title="SIDEBAR TEST uWu"
  >
    <div>
      Contenido
    </div>
    <div>
      de
    </div>
    <div>
      la
    </div>
    <div>
      sidebar
    </div>
    <ck-button @click="closeWithLoading()">
      CLOSE WITH LOADING
    </ck-button>
  </ck-sidebar>
</template>