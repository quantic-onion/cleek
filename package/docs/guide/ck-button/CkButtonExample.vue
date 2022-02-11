<template lang="pug">
ComponentShower(title="Types")
  ck-button.ck-component-item
    | Outlined (default)
  ck-button.ck-component-item(type="filled")
    | Filled
  ck-button.ck-component-item(type="flat")
    | Flat
  ck-button.ck-component-item(disabled)
    | disabled

ComponentShower(title="Align")
  ck-button.ck-component-item.w-full
    | Default
  ck-button.ck-component-item.w-full(align="center" icon="helicopter")
    | Center
  ck-button.ck-component-item.w-full(align="right" icon="user" icon-right="times")
    | Right

ComponentShower(title="Colors")
  ck-button.ck-component-item(type="filled")
    | primary
  ck-button.ck-component-item(color="secondary" type="filled")
    | secondary
  ck-button.ck-component-item(color="success" type="filled")
    | success
  ck-button.ck-component-item(color="danger" type="filled")
    | danger

ComponentShower(title="Icons")
  ck-button.ck-component-item(icon="square")
  ck-button.ck-component-item(icon="helicopter")
    | Icon
  ck-button.ck-component-item(icon="user" icon-right="times")
    | Icons

ComponentShower(title="Group")
  ck-button.ck-component-item-group-left(group="left")
    | Left
  ck-button.ck-component-item-group-center(group="center")
    | Center
  ck-button.ck-component-item-group-right(group="right")
    | Right
  ck-button.ck-component-item-group-left(group="left" icon="arrow-left")
  ck-button.ck-component-item-group-center(group="center" icon="arrow-left" icon-right="arrow-right")
  ck-button.ck-component-item-group-right(group="right" icon-right="arrow-right")
</template>

<script setup lang="ts">
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import { ckButton } from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../style/global'
</style>
