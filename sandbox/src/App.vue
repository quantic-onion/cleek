<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div class="licha-crack">Hola soy Lichykz</div>
    <Button label="Holi">
      Lich BTN
    </Button>
  </div>
  <router-view/>
</template>

<script>
import { Button } from 'cleek';

export default {
  name: 'ButtonExample',
  components: {
    Button,
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
