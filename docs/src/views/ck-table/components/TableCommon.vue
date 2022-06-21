<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref({
  search: '',
  // search: 'wenas',
  itemsPerPage: 20,
  currentPage: 3,
  listLength: 148,
});
const columnsList = ref([
  { title: 'ID' },
  { title: 'Nombre' },
  { title: 'Apellido' },
  { title: 'Notas' },
  { title: 'Borrar' },
]);
const itemsList = ref([
  { id: 1, name: 'Lisandro', surname: 'Dalla Costa' },
  { id: 2, name: 'Lautaro', surname: 'Dalla Costa' },
  { id: 3, name: 'Marcelo', surname: 'Dalla Costa' },
  { id: 4, name: 'Germán', surname: 'Hofer', notes: 'Una notita así re larga como si fuera un comentario de algún cliente en la sección de ventas de Rapisuper' },
  { id: 5, name: 'Rodrigo', surname: 'Hofer' },
]);
</script>

<template lang="pug">
ck-table(
v-model:search="tableData.search"
v-model:currentPage="tableData.currentPage"
layout="rounded"
:itemsPerPage="tableData.itemsPerPage"
:listLength="tableData.listLength"
:columns="columnsList"
)
  template(v-slot:header)
    | HOLA, ESTOY EN EL HEADER
  ck-tr(v-for="item in itemsList")
    ck-td(align="center") {{ item.id }}
    ck-td {{ item.name }}
    ck-td {{ item.surname }}
    ck-td {{ item.notes }}
    ck-td(align="center") Borrar
</template>
