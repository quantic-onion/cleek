<template lang="pug">
ComponentShower(title="Default")
  ck-dropdown
    template(#trigger)
      ck-button
        | Abrete sésamo
    template(#popper)
      | Dijiste las palabras mágias
  ck-dropdown(align="right")
    template(#trigger)
      ck-button
        | Abrete a la izquierda
    template(#popper)
      .whitespace-nowrap Okay mi jefecito, lo que usted diga
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
// import { ckDropdown, ckDropdownContent, ckDropdownItem } from '../../../src/components/index';
import { ckDropdown, ckButton } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
