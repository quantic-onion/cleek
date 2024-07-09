<script setup lang="ts">
import { ref } from 'vue';
import { ckNotify } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';
// components
import TestPopupWithInputDate from './TestPopupWithInputDate.vue';
import TestPopupWithFooter from './TestPopupWithFooter.vue';

const isPopupActive = ref({
  inputDate: false,
  withFooter: false,
});

const openPopup = () => {
  // ckNotify.confirm("Test"),
  // () => {
  // console.log("CONFIRMO");
  // };
  isPopupActive.value.inputDate = true;
};
function openPopupWithFooter() {
  isPopupActive.value.withFooter = true;
}
</script>

<template>
  <TestPopupWithInputDate v-model="isPopupActive.inputDate" />
  <TestPopupWithFooter v-model="isPopupActive.withFooter" />
  <ContainerTest title="POPUP">
    <ck-icon
      iconPack="cleek"
      icon="hex-warning"
      size="l"
      color="primary"
    />
    <ck-button @click="openPopup()">
      Test popup with input date
    </ck-button>
    <ck-button @click="openPopupWithFooter()">
      Test popup with footer
    </ck-button>
  </ContainerTest>
</template>
