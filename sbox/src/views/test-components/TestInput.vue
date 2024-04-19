<script setup lang="ts">
import { ref } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
const text = ref('');
</script>

<template>
  <ck-input label="buttons input" v-model="num1" plusMinusButtons type="number" :min="0" />
  <ck-input label="buttons input" v-model="num2" plusMinusButtons type="number" :min="0" />
  <ck-input label="text input" v-model="text" />
</template>