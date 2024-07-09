<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const isSidebarActive = ref(false);
const isLoading = ref(false);
const isUsingFooter = ref(false);

function closeWithLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3 * 1000 * 10);
}
</script>

<template>
  <ContainerTest title="SIDEBAR">
    <ck-button @click="isSidebarActive = true">
      Open sidebar
    </ck-button>
  </ContainerTest>
  <ck-sidebar
    v-model="isSidebarActive"
    :isLoading="isLoading"
    title="SIDEBAR TEST uWu"
  >
    <div class="content">Contenido</div>
    <div class="content">de</div>
    <div class="content">la</div>
    <div class="content">sidebar</div>
    <ck-button @click="closeWithLoading()">
      CLOSE WITH LOADING
    </ck-button>
    <div>
      <ck-switch v-model="isUsingFooter">
        Footer
      </ck-switch>
    </div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content">content</div>
    <div class="content content--last-1">1</div>
    <div class="content content--last-2">2</div>
    <div class="content content--last-3">3</div>
    <template v-if="isUsingFooter" #footer>
      PRUEBITA DEL FOOTER
    </template>
  </ck-sidebar>
</template>

<style lang="stylus" scoped>
.content
  padding 1rem
  font-size 1rem
  &.content--last-1
    background-color red
  &.content--last-2
    background-color blue
  &.content--last-3
    background-color green
</style>