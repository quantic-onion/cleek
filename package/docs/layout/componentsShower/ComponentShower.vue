<template lang="pug">
.component-shower
  h3 {{ title }}
  h6(v-if="subtitle") {{ subtitle }}
  .component-shower__body
    slot
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
});
</script>

<style lang="stylus" scoped>
@import '../../style/global'
.component-shower
  background-color #f5f5f5
  padding 1rem
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
</style>
