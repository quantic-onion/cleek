<template lang="pug">
ck-table(
v-model:search="table1.search"
:columns="table1.columns"
:itemsPerPage="table1.itemsPerPage"
:currentPage="table1.currentPage"
:listLength="table1.listLength"
)
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
</template>

<script>
import { ckButton, ckTable, ckTr, ckTd } from '../../../src/components/index';

export default {
  name: 'CkTableExample',
  components: {
    ckButton,
    ckTable,
    ckTr,
    ckTd,
  },
  data() {
    return {
      table1: {
        search: '',
        // search: 'wenas',
        itemsPerPage: 2,
        currentPage: 1,
        listLength: 48,
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
      },
      table2: {
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
      },
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../src/styles/tailwind-fake'
</style>
