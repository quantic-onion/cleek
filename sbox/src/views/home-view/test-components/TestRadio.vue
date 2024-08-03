<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';

const selectedValue = ref(null);
</script>

<template>
  <ContainerTest title="RADIO">
    <div class="test-radio">
      <div class="test-radio__radio_item">
        <ck-radio v-model="selectedValue" name="radio-item" value="el 1">
          valor 1
        </ck-radio>
        <ck-radio v-model="selectedValue" name="radio-item" value="el 2">
          valor 2
        </ck-radio>
      </div>
      <div v-if="selectedValue">
        seleccionado {{ selectedValue }}
      </div>
    </div>
  </ContainerTest>
</template>

<style lang="stylus" scoped>
.test-radio
  flex(column, flex-star, center, 2rem)
  .test-radio__radio_item
    flex(row, flex-star, center, 1rem)
</style>