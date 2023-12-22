<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useLayoutStore } from '@/stores/layout.stores.ts';

const { isDarkModeActive } = storeToRefs(useLayoutStore());

const computedStyle = computed(() => {
  const list = [];
  if (isDarkModeActive.value) list.push({ backgroundColor: '#23282E' });
  return list;
});
</script>

<template>
<div class="main-app" :style="computedStyle">
  <ck-navbar class="main-app--header">
    <ck-switch v-model="isDarkModeActive">
      DARK MODE
    </ck-switch>
  </ck-navbar>
  <div class="main-app--content">
    <router-view/>
  </div>
</div>
</template>

<style lang="stylus" scoped>
// .main-app--header
//   height 4rem
.main-app
  background-color #ccc
  padding 2rem
  padding-top 5rem
  height 100vh
</style>
