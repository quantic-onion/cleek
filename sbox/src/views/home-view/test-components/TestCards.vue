<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const isActive = ref(true);
</script>

<template>
  <ContainerTest title="CARDS" gap="0.5rem">
    <ck-card title="This is an example of a title">
      This is an example of the content
    </ck-card>
    <ck-card title="Title">
      Content
    </ck-card>
    <ck-card title="Clickable" clickable>
      Clickable
    </ck-card>
    <ck-card title="Closeable" v-model="isActive">
      closeable
    </ck-card>
    <ck-button v-if="!isActive" @click="isActive = true">
      Abrir de nuevo
    </ck-button>
  </ContainerTest>
</template>