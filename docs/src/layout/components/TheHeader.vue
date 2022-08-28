<script setup lang="ts">
const emits = defineEmits<{
  (e: 'openSidebar'): void;
}>();
</script>

<template lang="pug">
ck-navbar
  //- ck-button(icon="bars" @click="emits('openSidebar')")
  router-link(to="/")
    .flex.items-center
      ck-img(src="logo/isologo.png" height="50px")
      .logo Cleek
</template>

<style lang="stylus" scoped>
.logo
  font-family $logo-font
  font-size 3.5rem
  color $color-primary
</style>