<template lang="pug">
ComponentShower(title="Disabled")
  ck-router-link(disabled to="/")
    | Normal link
  ck-router-link(disabled to="/")
    | Normal span
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import { CkRouterLink } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../style/global'
</style>
