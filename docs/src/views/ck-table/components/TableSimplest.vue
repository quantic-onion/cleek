<script setup lang="ts">
import { ref } from 'vue';

const columns = ref(['Cant.', 'Precio', 'Nombre', 'Subtotal']);

const allSaleProducts = ref([
  { quantity: 3, price:  170.68, name: 'Medias Hidrógeno' },
  { quantity: 1, price:  998.70, name: 'Remera negra' },
  { quantity: 1, price: 1800.00, name: 'Pantalón largo verde' },
  { quantity: 2, price: 2690.99, name: 'Campera de corderito' },
]);
</script>

<template lang="pug">
ck-table(:columns="columns")
  template(v-slot:header)
    | An easy table, the simplest way
  ck-tr(v-for="(SaleProd, index) in allSaleProducts")
    //- quantity
    ck-td
      | {{ SaleProd.quantity }}x
    //- price
    ck-td
      | ${{ SaleProd.price }}
    //- name
    ck-td
      | {{ SaleProd.name }}
    //- subtotal
    ck-td
      span(v-if="SaleProd.quantity")
        | ${{ SaleProd.quantity * SaleProd.price }}
</template>
