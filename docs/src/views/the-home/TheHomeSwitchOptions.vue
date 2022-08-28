<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0);
</script>

<template lang="pug">
ck-switch-options(
v-model="value"
layout="rounded"
:options="[{ id: 0, name: 'Left' }, { id: 1, name: 'Right' }]"
)
</template>