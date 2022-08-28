<script setup lang="ts">
  const props = defineProps<{
    show: 'spinner' | 'blue' | 'danger' | 'secondary' | 'success';
  }>();
</script>

<template lang="pug">
ck-icon(icon="spinner" spin v-if="show === 'spinner'")
ck-icon(icon="bullhorn" color="blue" v-if="show === 'blue'")
ck-icon(icon="shrimp" size="2x" color="danger" v-if="show === 'danger'")
ck-icon(icon="helicopter" size="2x" color="secondary" v-if="show === 'secondary'")
ck-icon(icon="frog" size="3x" color="success" v-if="show === 'success'")
</template>