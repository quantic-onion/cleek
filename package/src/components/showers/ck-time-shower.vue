<script setup lang="ts">
import { qmDate } from 'quantic-methods';

type TsTime = string;

const props = defineProps<{
  time?: TsTime;
  minutes?: number;
}>();
</script>

<template>
<span class="ck-time-shower">
  <template v-if="minutes">
    {{ qmDate.minToHour(minutes) }}
  </template>
  <template v-else>
    | {{ qmDate.presentTime(time) }}
  </template>
  <span class="hs-text"> 
    hs
  </span>
</span>
</template>

<style lang="stylus" scoped>
.ck-time-shower
  white-space nowrap
  .hs-text
    color #ccc
    font-size 0.8rem
</style>