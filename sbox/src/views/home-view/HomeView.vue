<script setup lang="ts">
// components
import TestToggle from './test-components/TestToggle.vue';
import TestPagination from './test-components/TestPagination.vue';
import TestIcon from './test-components/TestIcon.vue';
import TestSidebar from './test-components/TestSidebar.vue';
import TestInput from './test-components/TestInput.vue';
import TestSelect from './test-components/TestSelect.vue';
import TestCheckbox from './test-components/TestCheckbox.vue';
import TestSwitch from './test-components/TestSwitch.vue';
import TestSwitchOptions from './test-components/TestSwitchOptions.vue';
import TestChip from './test-components/TestChip.vue';
import TestCircle from './test-components/TestCircle.vue';
import TestButton from './test-components/TestButton.vue';
import TestPopup from './test-components/test-popup/TestPopup.vue';
import TestRadio from './test-components/TestRadio.vue';
import TestTable from './test-components/test-popup/TestTable.vue';
import TestForm from './test-components/TestForm.vue';
import TestTabs from './test-components/TestTabs.vue';
import TestCards from './test-components/TestCards.vue';
</script>

<template>
  <div class="home-view">
    <TestToggle />
    <TestRadio />
    <TestTabs />
    <TestSwitch />
    <TestSwitchOptions />
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
    <TestCards />
  </div>
</template>

<style lang="stylus" scoped>
.home-view
  display flex
  gap 0.5rem
  flex-wrap wrap
</style>
