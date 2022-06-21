<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';
</script>

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

ComponentShower(title="Layout")
  ComponentShowerRow(title="rounded")
    ck-button(layout="rounded")
      | Outlined (default)
    ck-button(type="filled" layout="rounded")
      | Filled
    ck-button(type="flat" layout="rounded")
      | Flat
    ck-button(disabled layout="rounded")
      | disabled
  ComponentShowerRow(title="base")
    ck-button
      | Outlined (default)
    ck-button(type="filled")
      | Filled
    ck-button(type="flat")
      | Flat
    ck-button(disabled)
      | disabled
  ComponentShowerRow(title="squared")
    ck-button(layout="squared")
      | Outlined (default)
    ck-button(type="filled" layout="squared")
      | Filled
    ck-button(type="flat" layout="squared")
      | Flat
    ck-button(disabled layout="squared")
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
  ck-button(color="warning" type="filled")
    | warning
  ck-button(color="danger" type="filled")
    | danger
  ck-button(color="light" type="filled")
    | light
  ck-button(color="dark" type="filled")
    | dark

ComponentShower(title="Icons")
  ComponentShowerRow(title="icon")
    ck-button(icon="square" layout="squared")
    ck-button(icon="square" type="filled")
    ck-button(icon="square")
    ck-button(icon="square" type="flat")
    ck-button(icon="circle" layout="rounded")
    ck-button(icon="helicopter")
      | Icon
  ComponentShowerRow(title="icon-right")
    ck-button(icon="child-reaching" icon-right="bicycle")
      | Icons
    ck-button(icon-right="times")
      | Right
    ck-button(icon="arrow-left" icon-right="arrow-right")

ComponentShower(title="Group")
  ComponentShowerRow(noGap title="group")
    ck-button(group="left")
      | Left
    ck-button(group="center")
      | Center
    ck-button(group="right")
      | Right
    ck-button.ml-2(group="left" icon="arrow-left")
    ck-button(group="center" icon="arrow-left" icon-right="arrow-right")
    ck-button(group="right" icon-right="arrow-right")
  ComponentShowerRow(noGap title="group-vertical")
    div
      .flex
        ck-button(group="left" group-vertical="top" icon="arrow-left")
        ck-button(group="center" group-vertical="top" icon="minus")
        ck-button(group="right" group-vertical="top" icon="arrow-right")
      .flex
        ck-button(group="left" group-vertical="center" icon="arrow-left")
        ck-button(group="center" group-vertical="center" icon="minus")
        ck-button(group="right" group-vertical="center" icon="arrow-right")
      .flex
        ck-button(group="left" group-vertical="bottom" icon="arrow-left")
        ck-button(group="center" group-vertical="bottom" icon="minus")
        ck-button(group="right" group-vertical="bottom" icon="arrow-right")

PropsAndEmitsShower(
:propsList="propsAndEmits.button.props"
:emitsList="propsAndEmits.button.emits"
)
</template>
