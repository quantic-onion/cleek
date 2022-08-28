<script setup lang="ts">
import { ref } from 'vue';

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

<template lang="pug">
ck-table(:columns="columns")
  ck-tr(v-for="(SaleProd, index) in allSaleProducts")
    //- quantity
    ck-td(:col="columns.quantity" :index="index")
      template(#edit)
        ck-input(
        label="Cant."
        type="number"
        width="50px"
        v-model="SaleProd.quantity"
        )
      template(#show)
        | {{ SaleProd.quantity }}x

    //- price
    ck-td(:col="columns.price" :index="index")
      template(#edit)
        ck-input(
        autoSelect
        label="Precio"
        type="number"
        width="100px"
        v-model="SaleProd.price"
        v-if="SaleProd.price"
        )
      template(#show)
        | ${{ SaleProd.price }}

    //- name
    ck-td(:col="columns.name" :index="index")
      template(#edit)
        ck-input(label="Nombre" v-model="SaleProd.name")
      template(#show)
        | {{ SaleProd.name }}

    //- subtotal
    ck-td(:col="columns.subtotal" :index="index")
      span(v-if="SaleProd.quantity")
        | ${{ SaleProd.quantity * SaleProd.price }}

    //- delete
    //- ck-td(autoWidth :col="columns.delete")
    //-   ck-button.block(
    //-   size="s"
    //-   color="danger"
    //-   type="flat"
    //-   icon="trash-alt"
    //-   @click="deleteItem(SaleProd)"
    //-   )
</template>
