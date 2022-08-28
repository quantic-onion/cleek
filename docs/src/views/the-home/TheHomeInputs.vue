<script setup lang="ts">
  const props = defineProps<{
    show: 'number' | 'password';
  }>();
</script>

<template lang="pug">
ck-input(type="number" icon="dollar-sign" v-if="show === 'number'")
ck-input(label="Password" type="password" layout="rounded" v-if="show === 'password'")
</template>