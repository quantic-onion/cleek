<script setup lang="ts">
import { ref } from 'vue';

// const variableTooltip = ref('Contenido variable...');
</script>

<template lang="pug">
ck-tooltip(text="Hi 👋 I am a tooltip")
  span Hover me please
ck-tooltip(text="")
  span Texto vacío
//- ck-tooltip(:text="variableTooltip")
//-   span Texto variable

//- ck-input(label="Tooltip" v-model="variableTooltip")
</template>
