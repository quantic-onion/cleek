<template lang="pug">
.ck-navbar(
:style="computedStyle"
)
  .ck-navbar__content(
  :class="computedClassContent"
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  padding: { type: String, default: 0 },
  position: { type: String, default: 'fixed' },
});

const computedClassContent = computed(() => {
  const list = [];
  if (props.padding) list.push('has-padding');
  return list;
});

const computedStyle = computed(() => {
  const list = [];
  if (props.padding) list.push({ padding: props.padding });
  if (props.position) list.push({ position: props.position });
  return list;
});
</script>

<style lang="stylus" scoped>
@import '../../styles/index.styl'

.ck-navbar
  width 100%
  top 0
  z-index 99
  .ck-navbar__content
    padding .75rem 1rem
    background-color white
    width 100%
    ck-box-shadow()
    &.has-padding
      border-radius .5rem
</style>