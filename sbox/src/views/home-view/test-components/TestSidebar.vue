<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const isSidebarActive = ref(false);
const isSidebarActiveWithFooter = ref(false);
const isUsingCustomHeader = ref(false);
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
    <ck-button size="s" @click="isSidebarActive = true">
      Open sidebar
    </ck-button>
    <ck-button size="s" @click="isSidebarActiveWithFooter = true">
      Open sidebar with footer
    </ck-button>
  </ContainerTest>

  <!-- sidebar with footer -->
  <ck-sidebar
    v-model="isSidebarActiveWithFooter"
    title="Sidebar with footer"
  >
    <span>Content</span>
    <span>Content</span>
    <span>Content</span>
    <template #footer>
      Este es el footer
    </template>
  </ck-sidebar>

  <!-- other sidebar -->
  <ck-sidebar
    v-model="isSidebarActive"
    :isLoading="isLoading"
    :title="isUsingCustomHeader ? '' : 'SIDEBAR TEST uWu'"
  >
    <template v-if="isUsingCustomHeader" #header>
      <div class="custom-header">
        <img src="https://omnia-cdn.nyc3.cdn.digitaloceanspaces.com/static/logo/envi/envi-logo-dark.png" />
        <div class="custom-header--close-btn" @click="isSidebarActive = false">
          <ck-icon icon="chevron-left" color="white" />
        </div>
      </div>
    </template>
    <ck-switch v-model="isUsingCustomHeader">
      HEADER
    </ck-switch>
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
    <template #footer>
      Este es el footer
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

.custom-header
  padding 1rem
  position relative
  img
    height 4rem
  .custom-header--close-btn
    height 2rem
    width 2rem
    background-color var(--primary)
    border-radius 50%
    flex-center()
    position absolute
    right -1rem
    top 2rem
    ck-box-shadow(0.1)
    cursor pointer
</style>