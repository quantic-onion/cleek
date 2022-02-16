<template lang="pug">
div
  | Hola from dropdown
  VTooltip
    a Hover Me
    template(#popper)
      | Tooltip Content
//- button(v-tooltip="'You have ' + count + ' new messages.'")
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(17);
</script>