<template lang="pug">
ComponentShower(title="Types")
  ck-button
    | Outlined (default)
  ck-button(type="filled")
    | Filled
  ck-button(type="flat")
    | Flat
  ck-button(disabled)
    | disabled

ComponentShower(title="Rounded")
  ck-button(rounded)
    | Outlined (default)
  ck-button(type="filled" rounded)
    | Filled
  ck-button(type="flat" rounded)
    | Flat
  ck-button(disabled rounded)
    | disabled

ComponentShower(title="Size")
  ComponentShowerRow(noGap)
    ck-button(size="s" color="success" type="filled" group="left")
      | Size S
    ck-button(size="s" color="warning" type="filled" group="center")
      | Size S
    ck-button(size="s" color="danger" type="filled" group="right")
      | Size S
  ComponentShowerRow(noGap)
    ck-button(size="m" color="success" type="filled" group="left")
      | Size M
    ck-button(size="m" color="warning" type="filled" group="center")
      | Size M
    ck-button(size="m" color="danger" type="filled" group="right")
      | Size M
  ComponentShowerRow(noGap)
    ck-button(size="l" color="success" type="filled" group="left")
      | Size L
    ck-button(size="l" color="warning" type="filled" group="center")
      | Size L
    ck-button(size="l" color="danger" type="filled" group="right")
      | Size L

ComponentShower(title="Align")
  ck-button.w-full
    | Default
  ck-button.w-full(align="center" icon="helicopter")
    | Center
  ck-button.w-full(align="right" icon="user" icon-right="times")
    | Right

ComponentShower(title="Colors")
  ck-button(type="filled")
    | primary
  ck-button(color="secondary" type="filled")
    | secondary
  ck-button(color="success" type="filled")
    | success
  ck-button(color="danger" type="filled")
    | danger
  ck-button(color="light" type="filled")
    | light
  ck-button(color="dark" type="filled")
    | dark

ComponentShower(title="Icons")
  ck-button(icon="square")
  ck-button(icon="circle" rounded)
  ck-button(icon="helicopter")
    | Icon
  ck-button(icon="user" icon-right="times")
    | Icons

ComponentShower(title="Group" noGap)
  ck-button(group="left")
    | Left
  ck-button(group="center")
    | Center
  ck-button(group="right")
    | Right
  ck-button.ml-2(group="left" icon="arrow-left")
  ck-button(group="center" icon="arrow-left" icon-right="arrow-right")
  ck-button(group="right" icon-right="arrow-right")
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import ComponentShowerRow from '../../layout/componentsShower/ComponentShowerRow.vue';
import { ckButton } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
