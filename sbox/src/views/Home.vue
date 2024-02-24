<script setup lang="ts">
// components
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
import TestTable from '@/views/test-components/test-popup/TestTable.vue';
import TestForm from '@/views/test-components/TestForm.vue';
</script>

<template>
  <TestForm />
  <ck-icon iconPack="cleek" icon="heart" size="lg" color="primary" />
  <ck-icon iconPack="cleek" icon="heart-filled" size="md" color="secondary" />
  <TestPopup />
  <TestTable />
</template>

<style lang="stylus" scoped></style>
