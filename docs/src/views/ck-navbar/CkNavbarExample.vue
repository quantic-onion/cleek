<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits'
</script>

<template lang="pug">
ComponentShower(dark)
  ComponentShowerRow(title="default")
    ck-navbar(position="relative")
      .flex.justify-between
        div Business logo 
        div User name
  ComponentShowerRow(title="padding 0.5rem")
    ck-navbar(padding="0.5rem" position="relative")
      .flex.justify-between
        div Business logo 
        div User name

PropsAndEmitsShower(
:propsList="propsAndEmits.navbar.props"
:emitsList="propsAndEmits.navbar.emits"
)
</template>
