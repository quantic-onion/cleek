<script setup lang="ts">
import { ref } from 'vue';
import { ckNotify } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';
// components
import TestPopupWithInputDate from './TestPopupWithInputDate.vue';

const isPopupActive = ref({
  inputDate: false,
});

const open = () => {
  // ckNotify.confirm("Test"),
  // () => {
  // console.log("CONFIRMO");
  // };
  isPopupActive.value.inputDate = true;
};
</script>

<template>
  <TestPopupWithInputDate v-model="isPopupActive.inputDate" />
  <ContainerTest title="POPUP">
    <ck-icon
      iconPack="cleek"
      icon="hex-warning"
      size="l"
      color="primary"
    />
    <ck-button @click="open()">
      Test popup with input date
    </ck-button>
  </ContainerTest>
</template>
