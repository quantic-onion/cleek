<script setup lang="ts">
const props = defineProps<{
  noGap?: boolean;
  title?: string;
}>();
</script>

<template lang="pug">
.component-shower-row(
  :class="{ 'no-gap': noGap }"
)
  .component-shower-row--title {{ title }}
  .component-shower-row--content
    slot
</template>

<style lang="stylus" scoped>
.component-shower-row
  width 100%
  .component-shower-row--title
    width 100%
    color #aaa
    padding-bottom .5rem
  .component-shower-row--content
    padding-left 1rem
    width 100%
    display flex
    align-items flex-end
    flex-wrap wrap
    gap .5rem
  &.no-gap
    .component-shower-row--content
      gap 0
</style>