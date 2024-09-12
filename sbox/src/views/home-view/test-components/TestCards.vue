<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const isActive = ref(true);
</script>

<template>
  <ContainerTest title="CARDS" gap="0.5rem">
    <ck-card>
      <template #header>
        <div class="flex justify-between">
          <span>
            This is an <b>complex</b> title
          </span>
          <span>
            +
          </span>
        </div>
      </template>
      Data
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