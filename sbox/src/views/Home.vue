<script setup lang="ts">
// components
import TestInput from '@/views/test-components/TestInput.vue';
import TestSelect from '@/views/test-components/TestSelect.vue';
import TestChip from '@/views/test-components/TestChip.vue';
import TestCircle from '@/views/test-components/TestCircle.vue';
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
import TestTable from '@/views/test-components/test-popup/TestTable.vue';
import TestForm from '@/views/test-components/TestForm.vue';
</script>

<template>
  <TestInput />
  <TestSelect />
  <TestCircle />
  <TestChip />
  <TestForm />
  <ck-icon iconPack="cleek" icon="heart" size="lg" color="primary" />
  <ck-icon iconPack="cleek" icon="heart-filled" size="md" color="secondary" />
  <TestPopup />
  <TestTable />
</template>

<style lang="stylus" scoped></style>
