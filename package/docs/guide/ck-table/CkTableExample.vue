<script setup lang="ts">
import { ref } from 'vue';
import { CkButton, CkTable, CkTr, CkTd } from '../../../src/components/index';
import TableEditable from './components/TableEditable.vue';
import TableResponsive from './components/TableResponsive.vue';
import TableSimplest from './components/TableSimplest.vue';
import TableEmpty from './components/TableEmpty.vue';

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

<template lang="pug">
//- .mb-16
//-   TableEditable
.mb-16
  TableSimplest
.mb-16
  TableEmpty
.mb-16
  TableResponsive

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
    ck-td(align="center") {{ item.id }}
    ck-td {{ item.name }}
    ck-td {{ item.surname }}
    ck-td {{ item.notes }}
    ck-td(align="center") Borrar

//- table 2
h3 Alingment
ck-table(
:columns="table2.columns"
)
  ck-tr(v-for="item in table2.list")
    ck-td(align="center")
      ck-button
        | Detalles
    ck-td
      | {{ item.name }}
    ck-td(align="right") ${{ item.price }}

//- table 3
h3 Dynamic columns
div
  ck-table(
  hasColumnsManager
  not-full-width
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

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
