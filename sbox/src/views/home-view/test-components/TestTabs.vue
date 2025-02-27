<script setup lang="ts">
import { ref } from 'vue';
// components
import ContainerTest from './components/ContainerTest.vue';
// data
import { allColors } from '@/all-colors';

const selectedTab = ref('second');
const selectedTabTest = ref('first');
// const allTabs = ['tab1', 'tab2', 'tab3'];
</script>

<template>
  <ContainerTest title="TABS">
    <ck-tabs v-model="selectedTab">
      <ck-tab title="First"><p>I'm the first tab</p></ck-tab>
      <ck-tab title="Second"><p>I'm the second tab</p></ck-tab>
      <ck-tab title="Disabled"><p>I'm a disabled tab!</p></ck-tab>
    </ck-tabs>
    <ck-tabs v-model="selectedTabTest" class="mt-2" type="outlined">
      <ck-tab title="First"><p>I'm the first tab</p></ck-tab>
      <ck-tab title="Second"><p>I'm the second tab</p></ck-tab>
      <ck-tab title="Disabled"><p>I'm a disabled tab!</p></ck-tab>
    </ck-tabs>

    <!-- <ck-tabs v-model="selectedTab" :tabs="allTabs">
      <ck-tab v-if="selectedTab === 'tab1'">
        Contenido 1
      </ck-tab>
      <ck-tab v-if="selectedTab === 'tab2'">
        Contenido 2
      </ck-tab>
      <ck-tab v-if="selectedTab === 'tab3'">
        Contenido 3
      </ck-tab>
    </ck-tabs> -->
  </ContainerTest>
</template>