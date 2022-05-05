<template lang="pug">
ck-th(
:align="col.align"
:min-width="col.minWidth"
)
  | {{ col.title }}
</template>

<script setup lang="ts">
import ckTh from '../ck-th.vue';

const props = defineProps({
  col: { type: Object, required: true },
});
</script>
