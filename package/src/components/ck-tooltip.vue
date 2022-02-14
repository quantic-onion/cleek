<template lang="pug">
.ck-tooltip(tabindex="0")
  slot
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const props = defineProps({
  text: { type: String, required: true },
});

onMounted(() => {
  const context = getCurrentInstance().ctx;
  tippy(context.$el, {
    content: context.text,
  });
});
</script>

<style lang="stylus" scoped>
.ck-tooltip
  width -moz-fit-content
  width fit-content
</style>
