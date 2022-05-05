<template lang="pug">
ComponentShower(title="width-breaks")
  p Works with every component using lwidth-breaks
  p This break down at 600px
  ComponentShowerRow(noGap)
    ck-div(:width-breaks="[[0, '100%'], [600, '50%']]")
      .blue-box
    ck-div(:width-breaks="[[0, '100%'], [600, '50%']]")
      .red-box
  ComponentShowerRow(noGap)
    ck-input(group="left" :width-breaks="[[0, '100%'], [600, '50%']]")
    ck-input(group="right" :width-breaks="[[0, '100%'], [600, '50%']]")
  ComponentShowerRow(noGap)
    ck-select(group="left" :options="optionsExample" :width-breaks="[[0, '100%'], [600, '50%']]")
    ck-select(group="right" :options="optionsExample" :width-breaks="[[0, '100%'], [600, '50%']]")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import ComponentShowerRow from '../../layout/componentsShower/ComponentShowerRow.vue';
import { ckDiv, ckInput, ckSelect } from '../../../src/components/index';

const optionsExample = ref([
  { id: 1, name: 'Bueno' },
  { id: 2, name: 'Regular' },
  { id: 3, name: 'Malo' },
])
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'

.divs-test
  display inline-block
  width 100%
  @media (min-width 600px)
    width 50%

.red-box, .blue-box
  height 40px
  width 100%
  min-width 100px
  border-radius .25rem
.red-box
  // background-color
  background radial-gradient(#F98964, #E7235B)
.blue-box
  background radial-gradient(#89F3BA, #15B0CE)
</style>
