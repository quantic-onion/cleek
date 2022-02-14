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

ComponentShower(title="Icons")
  ck-button(icon="square")
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
import { ckButton } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../style/global'
</style>
