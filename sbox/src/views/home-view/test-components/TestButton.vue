<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';
</script>

<template>
  <ContainerTest title="BUTTON">
    <ck-button v-for="color in allColors" type="outlined" size="xs" :key="color" :color="color">
      {{ color }}
    </ck-button>
    <br/>
    <br/>
    <ck-button v-for="color in allColors" type="filled" size="s" :key="color" :color="color">
      {{ color }}
    </ck-button>
    <br/>
    <br/>
    <ck-button v-for="color in allColors" type="flat" size="s" :key="color" :color="color">
      {{ color }}
    </ck-button>
  </ContainerTest>
</template>