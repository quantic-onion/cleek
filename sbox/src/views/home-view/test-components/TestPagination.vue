<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';

const currentPage = ref(1);
</script>

<template>
  <ContainerTest title="PAGINATION">
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="rounded"
      btnType="flat"
      iconArrowLeft="chevron-left"
      iconArrowRight="chevron-right"
      iconDisableRight="slash"
    />
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="base"
      btnType="flat"
    />
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="squared"
      btnType="flat"
    />
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="squared"
      btnType="outlined"
    />
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="rounded"
      btnType="outlined"
    />
    <ck-pagination
      v-model="currentPage"
      :maxStep="15"
      btnLayout="base"
      btnType="outlined"
    />
  </ContainerTest>
</template>