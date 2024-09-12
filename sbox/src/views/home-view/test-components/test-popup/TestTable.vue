<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TableData } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';

const columnsList = [
  'Columna 1',
  'Columna 2',
  'Columna 3',
  'Columna 4',
  'Columna 5',
]
const isLoading = ref(false);
const tableData = ref(new TableData(10));

function refreshList(pageChange = false) {
  fakeLoadData();
}
function fakeLoadData() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    tableData.value.itemsPerPage = 22;
    tableData.value.listLength = 100;
  }, 2 * 1000);
}

onMounted(() => {
  fakeLoadData();
});
</script>
<template>
  <ContainerTest title="TABLE">
    <ck-table
      v-model:search="tableData.search"
      v-model:currentPage="tableData.currentPage"
      hasColumnsManager
      :isLoading="isLoading"
      :itemsPerPage="tableData.itemsPerPage"
      :listLength="tableData.listLength"
      :columns="columnsList"
      @refreshList="refreshList($event)"
    >
      <!-- <ck-tr v-for="num in [...Array(5).keys()]">
        <ck-td>num - 1</ck-td>
        <ck-td>num - 2</ck-td>
        <ck-td>num - 3</ck-td>
        <ck-td>num - 4</ck-td>
        <ck-td>num - 5</ck-td>
      </ck-tr> -->

    </ck-table>
    <ck-table
      :columns="columnsList"
      hideHeaderActions
    >
      <template #header>
        <div class="header-container">
          <ck-chip>Left</ck-chip>
          <ck-chip>Right</ck-chip>
        </div>
      </template>
    </ck-table>
  </ContainerTest>
</template>

<style lang="stylus" scoped>
.header-container
  margin-top 2rem
  display flex
  justify-content space-between
  width 100%
</style>