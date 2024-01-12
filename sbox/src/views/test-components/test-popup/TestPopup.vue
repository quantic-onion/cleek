<script setup lang="ts">
import { ckNotify } from "cleek";

import { ref } from "vue";
// components
import TestPopupWithInputDate from "./TestPopupWithInputDate.vue";

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
  <ck-icon iconPack="cleek" icon="hex-warning" size="l" color="primary" />

  <ck-button @click="open()"> Test popup with input date </ck-button>
</template>
