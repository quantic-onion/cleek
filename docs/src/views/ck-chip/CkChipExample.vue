<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';
</script>

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
ComponentShower(title="Align" subtitle="Align is just needed when chip width is bigger than default")
  ComponentShowerRow(title="left")
    ck-chip.w-full(size="m" align="left")
      | Left
  ComponentShowerRow(title="center (default)")
    ck-chip.w-full(size="m" align="center")
      | Center (default)
  ComponentShowerRow(title="right")
    ck-chip.w-full(size="m" align="right")
      | Right

PropsAndEmitsShower(
:propsList="propsAndEmits.chip.props"
:emitsList="propsAndEmits.chip.emits"
)
</template>
