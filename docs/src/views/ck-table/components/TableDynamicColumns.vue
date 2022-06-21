<script setup lang="ts">
import { ref } from 'vue';

const columnsList = ref({
  quantity: { title: 'Cantidad', align: 'right' },
  name: { title: 'Nombre', align: 'left' },
  price: { title: 'Precio', align: 'right', isDisplayed: false },
});
const itemsList = ref([
  { quantity: 2, name: 'Almendras', price: 187 },
  { quantity: 3, name: 'Porotos', price: 36 },
  { quantity: 1, name: 'Miel', price: 240 },
  { quantity: 1, name: 'Azucar', price: 99 },
]);
</script>

<template lang="pug">
div
  ck-table(
  hasColumnsManager
  not-full-width
  :columns="columnsList"
  )
    template(#header)
      | Tabla con administrador de columnas
    template(#default="{ columnsProps }")
      ck-tr(v-for="item in itemsList")
        //- quantity
        ck-td(:col="columnsList.quantity")
          | {{ item.quantity }}x
        //- name
        ck-td(:col="columnsList.name")
          | {{ item.name }}
        //- price
        ck-td(:col="columnsList.price")
          | ${{ item.price }}
</template>
