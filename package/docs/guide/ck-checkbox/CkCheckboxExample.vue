<template lang="pug">
.mb-2
  p State: {{ state }}
  ck-checkbox(v-model="state")
    | Checkbox
.mb-2
  ck-checkbox(:modelValue="false" disabled)
    | Unchecked disabled
.mb-2
  ck-checkbox(:modelValue="true" disabled)
    | Checked disabled
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CkCheckbox } from '../../../src/components/index'

const state = ref(false);
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
