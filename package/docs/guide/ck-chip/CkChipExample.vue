<template lang="pug">
ComponentShower(title="Size")
  ck-chip(size="xs")
    | Size xs
  ck-chip
    | Size s (default)
  ck-chip(size="m")
    | Size m
  ck-chip(size="l")
    | Size l
  ck-chip(size="xl")
    | Size xl
ComponentShower(title="Colors")
  ck-chip(icon="palette" size="m")
  ck-chip(icon="palette" size="m" color="primary")
  ck-chip(icon="palette" size="m" color="primary")
  ck-chip(icon="palette" size="m" color="primary-light")
  ck-chip(icon="palette" size="m" color="secondary")
  ck-chip(icon="palette" size="m" color="secondary-light")
  ck-chip(icon="palette" size="m" color="success")
  ck-chip(icon="palette" size="m" color="danger")
  ck-chip(icon="palette" size="m" color="warning")
  ck-chip(icon="palette" size="m" color="dark")
  ck-chip(icon="palette" size="m" color="light")
  ck-chip(icon="palette" size="m" color="unset")
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import { ckChip } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
