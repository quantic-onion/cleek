<template lang="pug">
.element-shower
  h2(v-if='title') {{ title }}
  h5(v-if='subtitle') {{ subtitle }}
  slot
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
}; // export default
</script>

<style lang="stylus" scoped>
.element-shower
  padding 1rem
  margin 1rem
  margin-top 0
  border 1px dashed #aaa
  border-top 0
  border-radius 0.5rem
  background-color #fafafa
  h2
    margin-bottom 0 !important
  h5
    margin-top 0 !important
    padding-left 0.5rem
    margin-bottom 1rem
</style>
