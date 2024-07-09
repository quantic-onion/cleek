<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
</script>

<template>
  <ContainerTest title="ICON">
    <!-- font awesome -->
    <ck-icon icon="star" size="xs" color="warning" />
    <ck-icon icon="star" size="s" color="warning" />
    <ck-icon icon="star" size="m" color="warning" />
    <ck-icon icon="star" size="l" color="warning" />
    <ck-icon icon="star" size="xl" color="warning" />
    <ck-icon icon="star" size="xxl" color="warning" />
    <!-- cleek -->
    <ck-icon iconPack="cleek" icon="heart" size="lg" color="primary" />
    <ck-icon iconPack="cleek" icon="heart-filled" size="md" color="secondary" />
  </ContainerTest>
</template>