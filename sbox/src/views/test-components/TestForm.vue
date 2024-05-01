<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const inputOne = ref('Default val');
const inputTwo = ref('');
const selectedOption = ref(0);
const refSelect = ref(null);

const options = [
  { id: 1, name: 'Uno' },
  { id: 2, name: 'Dos' },
  { id: 3, name: 'Tres' },
  { id: 4, name: 'Cuatro' },
]

function testClick() {
  refSelect.value.click();
}
</script>

<template>
  <ContainerTest title="FORM">
    <ck-button @click="testClick()">
      Click
    </ck-button>
    <ck-select
      label="Label text"
      ref="refSelect"
      v-model="selectedOption"
      :options="options"
    />
    <ck-input v-model="inputOne" />
    <ck-input v-model="inputTwo" label="Input dos" />
  </ContainerTest>
</template>