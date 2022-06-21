<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
// components
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import ComponentsSidebar from './components/ComponentsSidebar.vue';

const isSidebarActive = ref(false)
</script>

<template lang="pug">
.app
  TheHeader(@openSidebar="isSidebarActive = true")
  .page-content
    ComponentsSidebar
    .router-view
      RouterView
  TheFooter
</template>

<style lang="stylus">
.app
  display flex
  flex-direction column
  min-height 100vh
  position relative
  .page-content
    padding-top 6rem
    background-color #f5f5f5
    flex-grow 1
    padding-left 250px
    padding-bottom 5rem
    .router-view
      padding-y 2rem
</style>