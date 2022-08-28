<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';

const selectedValue1 = ref('value1');
const selectedValue2 = ref('value1');
const selectedValueClass = ref('');
const options = [
  { label: 'Label 1', value: 'value1' },
  { label: 'Label 2', value: 'value2' },
];
const selectedValueOptionsManually = ref('');
const selectedValueOptionsManuallyId = ref('');
const selectedValueVertical = ref('');
const selectedValueHorizontal = ref('');
</script>

<template lang="pug">
ComponentShower(title="Options prop")
  ck-radio(
  name="example"
  v-model="selectedValue1"
  :options="options"
  )
  .help-text // Selected: {{ selectedValue1 }}

ComponentShower(title="Options manually")
  ComponentShowerRow(title="Without label")
    ck-radio(v-model="selectedValueOptionsManually" name="manually" value="Licor")
    ck-radio(v-model="selectedValueOptionsManually" name="manually" value="Vino")
    ck-radio(v-model="selectedValueOptionsManually" name="manually" value="Fernet")
    .help-text(v-if="selectedValueOptionsManually") // Selected: {{ selectedValueOptionsManually }}
  ComponentShowerRow(title="Without label")
    ck-radio(v-model="selectedValueOptionsManuallyId" name="manually2" value="1" label="Licor")
    ck-radio(v-model="selectedValueOptionsManuallyId" name="manually2" value="2" label="Vino")
    ck-radio(v-model="selectedValueOptionsManuallyId" name="manually2" value="3" label="Fernet")
    .help-text(v-if="selectedValueOptionsManuallyId") // Selected: {{ selectedValueOptionsManuallyId }}

ComponentShower(title="Align")
  ComponentShowerRow(title="Horizontal (default)")
    ck-radio(
    name="horizontal"
    v-model="selectedValueHorizontal"
    :options="options"
    )
    .help-text(v-if="selectedValueHorizontal") // Selected: {{ selectedValueHorizontal }}
  ComponentShowerRow(title="Vertical")
    ck-radio(
    vertical
    classes="test"
    name="vertical"
    v-model="selectedValueVertical"
    :options="options"
    )
    .help-text(v-if="selectedValueVertical") // Selected: {{ selectedValueVertical }}
ComponentShower(title="Classes")
  ck-radio(
  v-model="selectedValueClass"
  classes="test-class"
  name="disabled-example"
  :options="options"
  )
ComponentShower(title="Disabled")
  ck-radio(
  disabled
  name="disabled-example"
  v-model="selectedValue2"
  value="I'm disabled"
  )
</template>

<style lang="stylus" scoped>
.test-class
  display flex
  background-color #ccc
  justify-content center
  width 100% !important
  padding .5rem
  border-radius 3rem
</style>