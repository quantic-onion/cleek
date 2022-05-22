<script setup lang="ts">
import { computed } from 'vue';
// components
import CkIcon from './ck-icon.vue';

const props = defineProps<{
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'; // default s
  color?: string;
  textColor?: string;
  // icon
  icon?: string;
  iconPack?: 'font-awesome' | 'feather';
}>();

const defaultColor = 'primary';
const defaultSize = 's';

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const computedClass = computed(() => {
  return [
    `size-${props.size || defaultSize}`,
    `ck-component__bg-color--${props.color || defaultColor}`,
  ];
});
const computedStyle = computed(() => {
  // const list = [];
  // if (props.color) {
  //   // list.push({ backgroundColor: props.color });
  //   // if (props.color !== 'light') {
  //   //   list.push({ color: props.textColor || 'white' });
  //   // }
  // }
  // return list;
  return [];
});
</script>

<template lang="pug">
.ck-chip(
:color="color"
:class="computedClass"
:style="computedStyle"
@click="emits('click', $event)"
)
  ck-icon(
  v-if="icon"
  :icon="icon"
  :icon-pack="iconPack"
  )
  slot
</template>

<style lang="stylus" scoped>
@require '../styles/index'

.ck-chip
  text-align center
  display inline-flex
  align-items center
  justify-content center
  font-size .75rem
  padding .3rem .75rem
  border-radius 10rem
  &.size-xs
    font-size .6rem
  &.size-m
    font-size .95rem
  &.size-l
    padding-x 1rem
    font-size 1.5rem
  &.size-xl
    padding-x 1.5rem
    font-size 2rem
</style>
