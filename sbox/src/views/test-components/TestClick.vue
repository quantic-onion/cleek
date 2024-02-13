<script setup lang="ts">
import { ref } from 'vue';

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
<ck-button @click="testClick()">
  Click
</ck-button>
<ck-select
  ref="refSelect"
  v-model="selectedOption"
  :options="options"
/>
</template>