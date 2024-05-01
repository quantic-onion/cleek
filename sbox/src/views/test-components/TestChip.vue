<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
</script>

<template>
  <ContainerTest title="CHIP">
    <ck-chip>primary</ck-chip>
    <ck-chip color="secondary">secondary</ck-chip>
    <ck-chip color="success">success</ck-chip>
    <ck-chip color="warning">warning</ck-chip>
    <ck-chip color="danger">danger</ck-chip>
    <ck-chip color="dark">dark</ck-chip>
    <ck-chip color="light">light</ck-chip>
    <ck-chip color="primary-light">primary light</ck-chip>
    <ck-chip color="secondary-light">secondary light</ck-chip>
    <ck-chip color="purple">purple</ck-chip>
  </ContainerTest>
</template>