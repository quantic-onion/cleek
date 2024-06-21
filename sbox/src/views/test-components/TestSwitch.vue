<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';

const isDisplayingSwitch = ref(true);
const valueDoNotUpdate = ref(false);
const remainingSecondsToUpdate = ref(0);
const values = ref({
  primary: true,
  secondary: true,
  success: false,
  warning: false,
  dark: false,
  light: false,
  purple: false,
});

watch(values, async () => {
  isDisplayingSwitch.value = false;
  await nextTick(); // this is to fix a cleek problem when updating the value from outside
  isDisplayingSwitch.value = true;
}, { deep: true });

function handleDoNotUpdate() {
  if (remainingSecondsToUpdate.value) return;
  remainingSecondsToUpdate.value = 3;
  const timeCounter = setInterval(() => {
    remainingSecondsToUpdate.value = remainingSecondsToUpdate.value - 1;
  }, 1000);
  setTimeout(() => {
    valueDoNotUpdate.value = !valueDoNotUpdate.value;
    clearInterval(timeCounter);
  }, 3000);
}
</script>

<template>
  <ContainerTest title="SWICH">
    <div v-if="isDisplayingSwitch" class="test-switch__container">
      <div class="test-switch__row">
        <ck-switch v-for="color in allColors" :key="color" :color="color" v-model="values[color]">
          {{ color }}
        </ck-switch>
      </div>
      <div class="test-switch__row">
        <ck-switch v-for="color in allColors" :key="color" :color="color" :colorText="color" v-model="values[color]">
          {{ color }}
        </ck-switch>
      </div>
    </div>
    <div>
      <p>Do not update</p>
      <ck-switch
        v-model="valueDoNotUpdate"
        preventAutoUpdate
        @click="handleDoNotUpdate()"
      />
      <p v-if="remainingSecondsToUpdate">Se actualizará en {{ remainingSecondsToUpdate }} segundos</p>
    </div>
  </ContainerTest>
</template>

<style lang="stylus" scoped>
.test-switch__container
  display flex
  flex-direction column
  gap 1rem
  .test-switch__row
    display flex
    gap 0.5rem
</style>