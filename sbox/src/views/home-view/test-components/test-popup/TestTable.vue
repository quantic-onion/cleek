<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TableData, SelectedRows } from 'cleek';
// components
import ContainerTest from '../components/ContainerTest.vue';

const rowActionId = ref(null);
const rowActionsOptions = [
  { id: null, name: 'Elije una acción' },
  { id: '1', name: 'Opcion 1'},
  { id: '2', name: 'Opcion 2'},
];
const columnsListSelectable = ref({
  id: { title: 'ID' },
  name: { title: 'Name' },
  test1: { title: 'testeando columnas largas', autoWidth: true },
  test2: { title: 'test largoooooooooooooooooooooo' },
  test3: { title: 'test largooooooooooooo' },
  test4: { title: 'testtttttttttttttttttttttttttttttttttttttttttttttttttttt' },
  test5: { title: 'testtttttttttttttttttttttttttttttttttttttttttttttttttt' },
  test6: { title: 'test' },
  test7: { title: 'test' },
  test8: { title: 'test' },
  test9: { title: 'test9' },
  hidden: { title: 'Hidden Col', isDisplayed: false },
});
const columnsList = [
  'Columna 1',
  'Columna 2',
  'Columna 3',
  'Columna 4',
  'Columna 5',
];
const selectedRows = ref(new SelectedRows([]));
const isLoading = ref(false);
const tableData1 = ref(new TableData(10));
const tableData2 = ref(new TableData(10));
const rows = [
  { id: 1, name: 'Col data 1' },
  { id: 2, name: 'Col data 2' },
  { id: 3, name: 'Col data 3' },
];

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
    <ck-table
      hasColumnsManager
      :columns="columnsListSelectable"
      :rows="rows"
      :selectedRows="selectedRows"
    >
    <template #selectedRowsActions>
      <ck-select
        v-model="rowActionId"
        :options="rowActionsOptions"
      />
    </template>
      <template #row="{ row: user }">
        <ck-td :col="columnsListSelectable.id">{{ user.id }}</ck-td>
        <ck-td :col="columnsListSelectable.name">{{ user.name }}</ck-td>
        <ck-td :col="columnsListSelectable.hidden">This column is hidden by default</ck-td>
        <ck-td :col="columnsListSelectable.test1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea qui inventore numquam voluptas neque blanditiis, iste esse adipisci recusandae eaque fuga laudantium pariatur similique eos eius voluptatibus alias corrupti quos.</ck-td>
        <ck-td :col="columnsListSelectable.test2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus mollitia consequatur tenetur, enim sapiente dicta harum eum. Mollitia deleniti, reiciendis illo porro dolor minus! Eveniet aut dolor laborum quo ipsam.</ck-td>
        <ck-td :col="columnsListSelectable.test3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi tempora officia est, sunt sit, provident unde iusto a hic dicta quo eaque nam voluptatum ad delectus beatae modi eveniet voluptatibus?</ck-td>
        <ck-td :col="columnsListSelectable.test4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis, cum soluta ipsum placeat totam magnam unde dicta eligendi nemo earum voluptates ex numquam laborum inventore! Quos dolor temporibus doloremque.</ck-td>
        <ck-td :col="columnsListSelectable.test5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dignissimos voluptate facilis dolores laudantium delectus animi consectetur eos id, officia quod totam beatae inventore dolorem harum, nostrum repellendus impedit tempore.</ck-td>
        <ck-td :col="columnsListSelectable.test6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at necessitatibus, eligendi possimus harum saepe minus quisquam velit, quo quam autem? Expedita asperiores beatae iure earum iste possimus minima harum.</ck-td>
        <ck-td :col="columnsListSelectable.test7">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore qui mollitia cupiditate iure numquam vel optio! Suscipit reiciendis exercitationem, itaque velit laboriosam, illo assumenda perferendis rerum, in placeat sit similique.</ck-td>
        <ck-td :col="columnsListSelectable.test8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ad voluptate eum corporis repellendus exercitationem expedita laborum nam distinctio vero, alias esse sapiente error est at molestiae magni doloribus eaque?</ck-td>
        <ck-td :col="columnsListSelectable.test9">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus quasi quis quia illum sint eum laudantium numquam doloremque dolor molestias quibusdam omnis eligendi iure molestiae consectetur impedit magni, odio cumque!</ck-td>
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
        :isLoading="tableData2.isLoading"
        :itemsPerPage="tableData2.itemsPerPage"
        :listLength="tableData2.listLength"
        :columns="columnsList"
        @refreshList="refreshList($event)"
      >
        <template #header>
          Example of header
        </template>
        <template #headerBottom>
          <div class="header-bottom">
            Example of header bottom
          </div>
        </template>
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
.header-bottom
  width 100%
  padding 1rem
  background-color var(--primary)
</style>