<template lang="pug">
ck-table(
v-model:search="table1.search"
v-model:currentPage="table1.currentPage"
:columns="table1.columns"
:itemsPerPage="table1.itemsPerPage"
:listLength="table1.listLength"
)
  template(v-slot:header)
    | HOLA, ESTOY EN EL HEADER
  ck-tr(v-for="item in table1.list")
    ck-td {{ item.id }}
    ck-td {{ item.name }}
    ck-td {{ item.surname }}
    ck-td(wrap) {{ item.notes }}
    ck-td Borrar

//- table 2
h3 Alineación
ck-table(
:columns="table2.columns"
)
  ck-tr(v-for="item in table2.list")
    ck-td
      ck-button
        | Detalles
    ck-td(align="left")
      | {{ item.name }}
    ck-td(align="right") ${{ item.price }}

//- table 3
h3 Alineación
ck-table(
hasColumnManager
:columns="table3.columns"
)
  template(#header)
    | Tabla con administrador de columnas
  template(#default="{ columnsProps }")
    ck-tr(v-for="item in table3.list")
      //- quantity
      ck-td(:col="table3.columns.quantity")
        | {{ item.quantity }}x
      //- name
      ck-td(:col="table3.columns.name")
        | {{ item.name }}
      //- price
      ck-td(:col="table3.columns.price")
        | ${{ item.price }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ckButton, ckTable, ckTr, ckTd } from '../../../src/components/index';

const table1 = ref({
  search: '',
  // search: 'wenas',
  itemsPerPage: 20,
  currentPage: 3,
  listLength: 148,
  columns: [
    { title: 'ID' },
    { title: 'Nombre' },
    { title: 'Apellido' },
    { title: 'Notas' },
    { title: 'Borrar' },
  ],
  list: [
    { id: 1, name: 'Lisandro', surname: 'Dalla Costa' },
    { id: 2, name: 'Lautaro', surname: 'Dalla Costa' },
    { id: 3, name: 'Marcelo', surname: 'Dalla Costa' },
    { id: 4, name: 'Germán', surname: 'Hofer', notes: 'Una notita así re larga como si fuera un comentario de algún cliente en la sección de ventas de Rapisuper' },
    { id: 5, name: 'Rodrigo', surname: 'Hofer' },
  ],
});

const table2 = ref({
  columns: [
    { title: 'Centrado' },
    { title: 'Alineación izquierda', align: 'left' },
    { title: 'Alineación derecha', align: 'right' },
  ],
  list: [
    { name: 'Frijoles La Habadía', price: '8,60' },
    { name: 'Tomates enlatados', price: '142,14' },
    { name: 'Perejil en rama Alicante x50g', price: '77.00' },
    { name: 'Átomo desinflamante', price: '999.99' },
  ],
});

const table3 = ref({
  columns: {
    quantity: { title: 'Cantidad', align: 'right' },
    name: { title: 'Nombre', align: 'left' },
    price: { title: 'Precio', align: 'right', isDisplayed: false },
  },
  list: [
    { quantity: 2, name: 'Almendras', price: 187 },
    { quantity: 3, name: 'Porotos', price: 36 },
    { quantity: 1, name: 'Miel', price: 240 },
    { quantity: 1, name: 'Azucar', price: 99 },
  ],
});
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
