<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';
</script>

<template lang="pug">
ComponentShower
  ck-label.mb-2
    | label-example
  ck-label.mb-2(align="center")
    | Helicopter
  ck-label.mb-2(align="right")
    | Jerardo Sofovich

PropsAndEmitsShower(
:propsList="propsAndEmits.label.props"
:emitsList="propsAndEmits.label.emits"
)
</template>
