<script setup lang="ts">
// components
import ContainerTest from '../components/ContainerTest.vue';

const columnsList = [
  'Columna 1',
  'Columna 2',
  'Columna 3',
  'Columna 4',
  'Columna 5',
]
</script>
<template>
  <ContainerTest title="TABLE">
    <ck-table
      :columns="columnsList"
      :listLength="0"
    >
      <!-- <ck-tr v-for="num in [...Array(5).keys()]">
        <ck-td>num - 1</ck-td>
        <ck-td>num - 2</ck-td>
        <ck-td>num - 3</ck-td>
        <ck-td>num - 4</ck-td>
        <ck-td>num - 5</ck-td>
      </ck-tr> -->

    </ck-table>
  </ContainerTest>
</template>