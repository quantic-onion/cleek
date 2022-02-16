<template lang="pug">
ComponentShower(title="Default")
  ck-dropdown
    template(#trigger)
      ck-button
        | Abrete sésamo
    template(#popper)
      | Dijiste las palabras mágias
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
// import { ckDropdown, ckDropdownContent, ckDropdownItem } from '../../../src/components/index';
import { ckDropdown, ckButton } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
