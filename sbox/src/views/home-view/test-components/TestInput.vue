<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const num1 = ref(0);
const num2 = ref(0);
const text = ref('');
const email = ref('lisandromdc@gmail.com');
const pass = ref('');
const selectedDate = ref(null);
</script>

<template>
  <ContainerTest title="INPUT">
    <ck-input label="buttons input" v-model="num1" plusMinusButtons type="number" :min="0" />
    <ck-input label="buttons input" v-model="num2" plusMinusButtons type="number" :min="0" />
    <ck-input label="text input" v-model="text" group="left" icon="dollar-sign" optional />
    <ck-input label="text input" v-model="text" group="center" iconRight="dollar-sign" optional />
    <ck-input label="email without withspaces" class="mr-2" group="right" v-model="email" disallowSpaces />
    <ck-input type="password" label="pass" v-model="pass" />
    <ck-input-date clearable label="date" v-model="selectedDate" />
  </ContainerTest>
</template>