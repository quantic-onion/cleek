<script setup lang="ts">
import { ref } from 'vue';
// components
import TestPopupWithInputDate from './TestPopupWithInputDate.vue';

const isPopupActive = ref({
  inputDate: false,
});
</script>

<template>
<TestPopupWithInputDate v-model="isPopupActive.inputDate"/>
<ck-button @click="isPopupActive.inputDate = true">
  Test popup with input date
</ck-button>
</template>