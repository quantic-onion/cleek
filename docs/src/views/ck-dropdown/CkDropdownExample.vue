<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';
</script>

<template lang="pug">
ComponentShower(title="Default")
  ck-dropdown
    template(#trigger)
      ck-button
        | Open details
    template(#popper)
      | Secret of life is hidden here
ComponentShower(title="Align")
  ck-dropdown
    template(#trigger)
      ck-button
        | - - - - - Left - - - - -
    template(#popper)
      | Left details
  ck-dropdown(align="center")
    template(#trigger)
      ck-button
        | - - - - - Center - - - - -
    template(#popper)
      | Center details
  ck-dropdown(align="right")
    template(#trigger)
      ck-button
        | - - - - - Right - - - - -
    template(#popper)
      | Right details
ComponentShower(title="Dark")
  ck-dropdown(dark)
    template(#trigger)
      ck-button
        | Black details
    template(#popper)
      | Night mode activated

PropsAndEmitsShower(
:propsList="propsAndEmits.dropdown.props"
:emitsList="propsAndEmits.dropdown.emits"
)
</template>
