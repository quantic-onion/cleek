<script setup lang="ts">
import { ref } from 'vue';

const num = ref(0);
</script>

<template>
  <ck-input v-model="num" plusMinusButtons />
  ESTE ES EL TEST DE LOS INPUTS
</template>