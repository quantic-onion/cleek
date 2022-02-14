<template lang="pug">
div
  ck-switch-options(
  label="¿Qué te gustan?"
  v-model="iLikeMen"
  :options="[{ id: false, name: 'Mujeres' }, { id: true, name: 'Hombres' }]"
  )
  h2.text-center
    span(v-if="!iLikeMen") Tabién
    span(v-else) Fuaah, qué olor a gay
div
  ck-switch-options(
  notReduce
  label="¿De qué equipo sos?"
  prop="teamName"
  v-model="SelectedTeam"
  :options="teamOptions"
  )
  h3.text-center(v-if="SelectedTeam.id")
    | Mi club es: {{ SelectedTeam }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ckSwitchOptions } from '../../../src/components/index';

const iLikeMen = ref(false);
const SelectedTeam = ref({});
const teamOptions = ref([
  { id: 1, teamName: 'Bokita' },
  { id: 2, teamName: 'Ribergüenza' },
  { id: 3, teamName: 'Coloncito papá' },
  { id: 4, teamName: 'Bunión' },
]);
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
