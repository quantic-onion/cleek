<script setup lang="ts">
// components
import ContainerTest from './components/ContainerTest.vue';
</script>

<template>
  <ContainerTest title="BUTTON">
    <ck-button size="s">default</ck-button>
    <ck-button size="s" type="flat">flat</ck-button>
    <ck-button size="s" type="filled">filled</ck-button>
    <br/>
    <ck-button size="s">primary</ck-button>
    <ck-button size="s" color="secondary">secondary</ck-button>
    <ck-button size="s" color="success">success</ck-button>
    <ck-button size="s" color="warning">warning</ck-button>
    <ck-button size="s" color="danger">danger</ck-button>
    <ck-button size="s" color="dark">dark</ck-button>
    <ck-button size="s" color="light">light</ck-button>
    <ck-button size="s" color="primary-light">primary light</ck-button>
    <ck-button size="s" color="secondary-light">secondary light</ck-button>
    <ck-button size="s" color="purple">purple</ck-button>
  </ContainerTest>
</template>