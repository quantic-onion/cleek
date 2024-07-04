<script setup lang="ts">
// components
import TestPagination from '@/views/test-components/TestPagination.vue';
import TestIcon from '@/views/test-components/TestIcon.vue';
import TestSidebar from '@/views/test-components/TestSidebar.vue';
import TestInput from '@/views/test-components/TestInput.vue';
import TestSelect from '@/views/test-components/TestSelect.vue';
import TestCheckbox from '@/views/test-components/TestCheckbox.vue';
import TestSwitch from '@/views/test-components/TestSwitch.vue';
import TestChip from '@/views/test-components/TestChip.vue';
import TestCircle from '@/views/test-components/TestCircle.vue';
import TestButton from '@/views/test-components/TestButton.vue';
import TestPopup from '@/views/test-components/test-popup/TestPopup.vue';
import TestTable from '@/views/test-components/test-popup/TestTable.vue';
import TestForm from '@/views/test-components/TestForm.vue';
</script>

<template>
  <div class="home">
    <TestSwitch />
    <TestCheckbox />
    <TestPagination />
    <TestIcon />
    <TestSidebar />
    <TestInput />
    <TestSelect />
    <TestCircle />
    <TestButton />
    <TestChip />
    <TestForm />
    <TestPopup />
    <TestTable />
  </div>
</template>

<style lang="stylus" scoped>
.home
  display flex
  gap 0.5rem
  flex-wrap wrap
</style>
