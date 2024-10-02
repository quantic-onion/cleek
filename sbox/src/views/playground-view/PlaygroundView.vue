<script setup lang="ts">
import { ref } from 'vue';
import { CkInput } from 'cleek';

const value = ref(0);
</script>

<template>
  <div class="playground-view">
    <ck-input v-model="value" type="number" />
  </div>
</template>

<style lang="stylus" scoped>
.playground-view
  padding 5rem
</style>
