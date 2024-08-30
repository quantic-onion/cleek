<script setup lang="ts">
import { darkMode } from '@/cleek-config';

const props = defineProps<{
  title: string;
  gap?: string;
}>();
</script>

<template>
  <div
    class="container-test"
    :class="{ 'dark-mode': darkMode }"
  >
    <h5>{{ title }}</h5>
    <div :style="{ 'gap': gap, 'display': gap ? 'flex' : '' }">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container-test
  display inline-flex
  flex-direction column
  background-color rgba(255, 255, 255, 0.5)
  padding 0.5rem 0.75rem
  border-radius 0.25rem
  &.dark-mode
    background-color #0f1012
    h5
      color white
  h5
    margin 0
    padding-bottom 0.5rem
</style>