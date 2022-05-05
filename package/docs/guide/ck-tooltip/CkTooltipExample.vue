<template lang="pug">
ck-tooltip(text="Hi 👋 I am a tooltip")
  span Hover me please
ck-tooltip(text="")
  span Texto vacío
ck-tooltip(:text="variable")
  span Texto variable

ck-button(@click="variable = 'Nuevo texto'")
  | Update
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ckTooltip, ckButton } from '../../../src/components/index';

const variable = ref('');
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
