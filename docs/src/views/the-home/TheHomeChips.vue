<script setup lang="ts">
  const props = defineProps<{
    show: 'danger' | 'common' | 'light' | 'success';
  }>();
</script>

<template lang="pug">
ck-chip(icon="times" size="l" color="danger" v-if="show === 'danger'")
ck-chip(icon="palette" size="s" v-if="show === 'common'")
ck-chip(icon="user" size="s" color="light" v-if="show === 'light'")
ck-chip(icon="check" size="l" color="success" v-if="show === 'success'")
</template>