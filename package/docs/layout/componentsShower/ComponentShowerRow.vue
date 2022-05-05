<template lang="pug">
.component-shower-row(
  :class="{ 'no-gap': noGap }"
)
  slot
</template>

<script setup lang="ts">
const props = defineProps({
  noGap: { type: Boolean, default: false },
});
</script>

<style lang="stylus" scoped>
.component-shower-row
  width 100%
  display flex
  align-items flex-end
  flex-wrap wrap
  gap .5rem
  &.no-gap
    gap 0
</style>