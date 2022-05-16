<template lang="pug">
h2.text-center Table responsive
ck-table(:columns="columns")
  template(#mobile)
    div(v-for="(SaleProd, index) in allSaleProducts")
      //- quantity
      | {{ SaleProd.quantity }}x
      //- price
      | ${{ SaleProd.price }}
      //- name
      | {{ SaleProd.name }}
      //- subtotal
      span(v-if="SaleProd.quantity")
        | ${{ SaleProd.quantity * SaleProd.price }}
  template(#desktop)
    ck-tr(v-for="(SaleProd, index) in allSaleProducts")
      //- quantity
      ck-td(:col="columns.quantity" :index="index")
        | {{ SaleProd.quantity }}x
      //- price
      ck-td(:col="columns.price" :index="index")
        | ${{ SaleProd.price }}
      //- name
      ck-td(:col="columns.name" :index="index")
        | {{ SaleProd.name }}
      //- subtotal
      ck-td(:col="columns.subtotal" :index="index")
        span(v-if="SaleProd.quantity")
          | ${{ SaleProd.quantity * SaleProd.price }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CkButton, CkInput, CkTable, CkTr, CkTd } from '../../../../src/components/index';

const columns = ref({
    quantity: { title: 'Cant.', align: 'right' },
    price: { title: 'Precio', align: 'right' },
    name: { title: 'Nombre' },
    subtotal: { title: 'Subtotal', align: 'right' },
});

const allSaleProducts = ref([
  { quantity: 3, price:  170.68, name: 'Medias Hidrógeno' },
  { quantity: 1, price:  998.70, name: 'Remera negra' },
  { quantity: 1, price: 1800.00, name: 'Pantalón largo verde' },
  { quantity: 2, price: 2690.99, name: 'Campera de corderito' },
]);
</script>