<script setup lang="ts">
import { ref } from 'vue';
import { ckNotify } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';
// components
import TestPopupWithInputDate from './TestPopupWithInputDate.vue';
import TestPopupWithFooter from './TestPopupWithFooter.vue';
import TestPopupGiant from './TestPopupGiant.vue';

const isPopupActive = ref({
  inputDate: false,
  withFooter: false,
  giant: false,
});

const openPopup = () => {
  isPopupActive.value.inputDate = true;
};
function openPopupWithFooter() {
  isPopupActive.value.withFooter = true;
}
function openPopupGiant() {
  isPopupActive.value.giant = true;
}
</script>

<template>
  <TestPopupWithInputDate v-model="isPopupActive.inputDate" />
  <TestPopupWithFooter v-model="isPopupActive.withFooter" />
  <TestPopupGiant v-model="isPopupActive.giant" />
  <ContainerTest title="POPUP">
    <ck-icon
      iconPack="cleek"
      icon="hex-warning"
      size="l"
      color="primary"
    />
    <ck-button size="s" @click="openPopup()">
      Test popup with input date
    </ck-button>
    <ck-button size="s" @click="openPopupWithFooter()">
      Test popup with footer
    </ck-button>
    <ck-button size="s" @click="openPopupGiant()">
      Test popup giant
    </ck-button>
  </ContainerTest>
</template>
