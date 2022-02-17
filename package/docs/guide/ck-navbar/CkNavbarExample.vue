<template lang="pug">
ComponentShower(title="Default" dark)
  ck-navbar(position="relative")
    .flex.justify-between
      div Rapisuper San Carlos Sud 
      div Lisandro Dalla Costa
  ck-navbar(padding="0.5rem" position="relative")
    .flex.justify-between
      div Rapisuper San Carlos Sud 
      div Lisandro Dalla Costa
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import { ckNavbar } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
