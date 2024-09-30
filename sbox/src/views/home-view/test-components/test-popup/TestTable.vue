<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TableData, SelectedRows } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';

const columnsList = [
  'Columna 1',
  'Columna 2',
  'Columna 3',
  'Columna 4',
  'Columna 5',
]
const selectedRows = ref(new SelectedRows([]));
const isLoading = ref(false);
const tableData1 = ref(new TableData(10));
const tableData2 = ref(new TableData(10));
const rows = [
  { id: 1, name: 'Col data 1' },
  { id: 2, name: 'Col data 2' },
  { id: 3, name: 'Col data 3' },
]

function refreshList(pageChange = false) {
  fakeLoadData();
}
function fakeLoadData() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    tableData1.value.itemsPerPage = 22;
    tableData1.value.listLength = 100;
  }, 2 * 1000);
}

onMounted(() => {
  fakeLoadData();
});
</script>
<template>
  <ContainerTest title="TABLE">
    <ck-table :rows="rows" :selectedRows="selectedRows">
      <template #row="{ row: user }">
        <ck-td>__{{ user.id }}__ {{ user.name }}</ck-td>
      </template>
    </ck-table>
    <div class="test-tables__content">
      <ck-table
        v-model:search="tableData1.search"
        v-model:currentPage="tableData1.currentPage"
        hasColumnsManager
        :isLoading="isLoading"
        :itemsPerPage="tableData1.itemsPerPage"
        :listLength="tableData1.listLength"
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
      <!-- table 2 -->
      <ck-table
        v-model:search="tableData2.search"
        v-model:currentPage="tableData2.currentPage"
        hasColumnsManager
        :isLoading="tableData2.isLoading"
        :itemsPerPage="tableData2.itemsPerPage"
        :listLength="tableData2.listLength"
        :columns="columnsList"
        @refreshList="refreshList($event)"
      >
      </ck-table>
      <!-- table 3 -->
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
    </div>
  </ContainerTest>
</template>

<style lang="stylus" scoped>
.header-container
  display flex
  justify-content space-between
  width 100%
.test-tables__content
  display flex
  flex-direction column
  gap 2rem
</style>