<template lang="pug">
.ck-tooltip(tabindex="0")
  slot
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, watch } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

let context;

const props = defineProps({
  text: { type: String, required: true },
});

watch(() => props.text, (newValue, oldValue) => {
  setText();
});

const setText = () => {
  tippy(context.$el, {
    content: context.text,
  });
}

onMounted(() => {
  context = getCurrentInstance().ctx;
  if (!props.text) return;
  setText();
});
</script>

<style lang="stylus" scoped>
.ck-tooltip
  // font-family Avenir, Helvetica, Arial, sans-serif
  width -moz-fit-content
  width fit-content
</style>
