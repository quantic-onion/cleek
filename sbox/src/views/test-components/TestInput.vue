<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const num1 = ref(0);
const num2 = ref(0);
const text = ref('');
const email = ref('lisandromdc@gmail.com');
</script>

<template>
  <ContainerTest title="INPUT">
    <ck-input label="buttons input" v-model="num1" plusMinusButtons type="number" :min="0" />
    <ck-input label="buttons input" v-model="num2" plusMinusButtons type="number" :min="0" />
    <ck-input label="text input" v-model="text" />
    <ck-input label="email without withspaces" v-model="email" disallowSpaces />
  </ContainerTest>
</template>