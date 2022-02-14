<template lang="pug">
#nav
  router-link(to="/")
    | Home
  router-link(to="/about")
    | About
  .licha-crack
    | Hola soy Lichykz

.content
  //- input text
  div
    h3 Input Text
      div {{ text }}
      ck-input-text(v-model="text")
  //- icon
  div
    h3 Icon
    ck-icon(icon="helicopter")
    ck-icon(spin icon="spinner")
  //- button
  div
    h3 Buttons
    ck-button
      | Outlined
    ck-button(type="filled")
      | Filled
    ck-button(type="text")
      | Text
  //- select
  div
    h3 Select
    ck-select(
    v-model="selectedOption"
    :options="options"
    noDataText="No hay opciones"
    )
router-view
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('holi');
const selectedOption = ref(0);
const options = ref([
  { id: 1, name: 'Lisandro' },
  { id: 2, name: 'Germán' },
  { id: 3, name: 'Alberto Palavecino' },
]);
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
