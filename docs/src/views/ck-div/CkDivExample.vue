<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';

const optionsExample = ref([
  { id: 1, name: 'Bueno' },
  { id: 2, name: 'Regular' },
  { id: 3, name: 'Malo' },
])
</script>

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

PropsAndEmitsShower(
:propsList="propsAndEmits.div.props"
:emitsList="propsAndEmits.div.emits"
)
</template>

<style lang="stylus" scoped>
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
