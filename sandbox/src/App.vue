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

<script>
// import { ckButton, ckInputText, ckIcon, ckSelect } from 'cleek';

export default {
  name: 'ButtonExample',
  data() {
    return {
      text: 'holi',
      selectedOption: 0,
      options: [
        { id: 1, name: 'Lisandro' },
        { id: 2, name: 'Germán' },
        { id: 3, name: 'Alberto Palavecino' },
      ],
    };
  },
  // components: {
  //   ckButton,
  //   ckInputText,
  //   ckIcon,
  //   ckSelect,
  // },
}; // export default
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
