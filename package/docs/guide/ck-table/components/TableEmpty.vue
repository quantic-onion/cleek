<template lang="pug">
h2.text-center Table Empty
ck-table(
:columns="columns"
noResultsText="I forget to load the items hehe"
:listLength="0"
)
  template(v-slot:header)
    | When a table has no results, it shows a custom message
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

<script setup lang="ts">
import { ref } from 'vue';
import { CkButton, CkInput, CkTable, CkTr, CkTd } from '../../../../src/components/index';

const columns = ref(['Cant.', 'Precio', 'Nombre', 'Subtotal']);

const allSaleProducts = ref([]);
</script>