<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  noGap: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
});
</script>

<template lang="pug">
.component-shower(:class="{ 'is-dark': dark }")
  h3 {{ title }}
  h6.component-shower--subtitle(v-if="subtitle") {{ subtitle }}
  .component-shower__body(
  :class="{ 'no-gap': noGap }"
  )
    slot
</template>

<style lang="stylus" scoped>
.component-shower
  padding 1rem
  .component-shower--subtitle
    padding-left 2.5rem
    color #aaa

  &.is-dark
    .component-shower__body
      background-color #333
  h3
    margin 0
    margin-left 2rem
  h6
    margin 0
  .component-shower__body
    padding 1rem
    margin-top .5rem
    margin-x 1rem
    background-color white
    border-radius .5rem
    display flex
    flex-wrap wrap
    gap .5rem
    align-items flex-end
    &.no-gap
      gap 0
</style>
