<template lang="pug">
#nav
  router-link(to="/")
    | Home
  router-link(to="/about")
    | About
  .licha-crack
    | Hola soy Lichykz
  ck-button
    | Outlined
  ck-button(type="filled")
    | Filled
  ck-button(type="text")
    | Text
router-view
</template>

<script>
import { ckButton } from 'cleek';

export default {
  name: 'ButtonExample',
  components: {
    ckButton,
  },
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
