<template>
  <img alt="Vue logo" src="/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ck-button>
    Lisandrito
  </ck-button>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './lib-components/HelloWorld.vue';
import CkButton from './lib-components/ck-Button.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
