<template lang="pug">
.mb-2
  p Selected value: {{ selectedValue1 }}
  ck-radio(
  name="example"
  v-model="selectedValue1"
  :options="options"
  )
.mb-2
  p Here is an example of a disabled radio group
  ck-radio(
  disabled
  name="disabled-example"
  v-model="selectedValue2"
  :options="options"
  )
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CkRadio } from '../../../src/components/index';

const selectedValue1 = ref('value1');
const selectedValue2 = ref('value1');
const options = [
  { label: 'Label 1', value: 'value1' },
  { label: 'Label 2', value: 'value2' },
];
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
