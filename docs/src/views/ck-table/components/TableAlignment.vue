<script setup lang="ts">
import { ref } from 'vue';

const columnsList = ref({
  details: { title: 'Centrado', align: 'center', autoWidth: true },
  name: { title: 'Alineación izquierda', align: 'left' },
  price: { title: 'Alineación derecha', align: 'right' },
});
const itemsList = ref([
  { name: 'Frijoles La Habadía', price: '8,60' },
  { name: 'Tomates enlatados', price: '142,14' },
  { name: 'Perejil en rama Alicante x50g', price: '77.00' },
  { name: 'Átomo desinflamante', price: '999.99' },
]);
</script>

<template lang="pug">
ck-table(
:columns="columnsList"
)
  ck-tr(v-for="item in itemsList")
    ck-td(:col="columnsList.details")
      ck-button
        | Detalles
    ck-td(:col="columnsList.name")
      | {{ item.name }}
    ck-td(:col="columnsList.price")
      | ${{ item.price }}
</template>
