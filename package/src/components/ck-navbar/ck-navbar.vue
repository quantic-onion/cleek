<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  padding?: string;
  position?: string;
}>();

const defaultPosition = 'fixed';

const computedClassContent = computed(() => {
  const list = [];
  if (props.padding) list.push('has-padding');
  return list;
});

const computedStyle = computed(() => {
  const list = [];
  if (props.padding) list.push({ padding: props.padding });
  // position
  const position = props.position || defaultPosition;
  if (position) list.push({ position: position });
  return list;
});
</script>

<template lang="pug">
.ck-navbar(:style='computedStyle')
  .ck-navbar__content(:class='computedClassContent')
    slot
</template>

<style lang="stylus" scoped>
@import '../../styles/index.styl'

.ck-navbar
  width 100%
  top 0
  z-index 99
  .ck-navbar__content
    padding 0.75rem 1rem
    background-color white
    width 100%
    ck-box-shadow()
    &.has-padding
      border-radius 0.5rem
</style>
