<template lang="pug">
.flex
  .w-half
    div Selected ID: {{ selectedId }}
    ck-select(
    label="¿Quién es el más lindo?"
    v-model="selectedId"
    :options="options"
    )
  .w-half
    div Selected option: {{ selectedOption }}
    ck-select(
    notReduce
    label="¿Quién es el más lindo?"
    v-model="selectedOption"
    :options="options"
    )
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ckSelect } from '../../../src/components/index';

const selectedId = ref(0);
const selectedOption = ref({});
const options = ref([
  { id: 1, name: 'Lisandro Dalla Costa' },
  { id: 2, name: 'Germán Hofer' },
  { id: 3, name: 'Alberto piedrabuena' },
  { id: 4, name: 'Jorge Risso' },
  { id: 5, name: 'Ernesto Laprida' },
  { id: 6, name: 'Lautaro Dalla Costa' },
]);
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
