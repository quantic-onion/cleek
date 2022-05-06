<template lang="pug">
ck-tooltip(text="Hi 👋 I am a tooltip")
  span Hover me please
ck-tooltip(text="")
  span Texto vacío
//- ck-tooltip(:text="variableTooltip")
//-   span Texto variable

//- ck-input(label="Tooltip" v-model="variableTooltip")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ckTooltip, ckInput } from '../../../src/components/index';

// const variableTooltip = ref('Contenido variable...');
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
