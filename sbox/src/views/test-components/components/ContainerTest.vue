<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="container-test">
    <h5>{{ title }}</h5>
    <div>
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
  h5
    margin 0
    padding-bottom 0.5rem
</style>