<script setup lang="ts">
import { computed } from 'vue';
// components
import CkIcon from './ck-icon.vue';
// types
import type { Align, Color, Icon, IconPack, Size } from '../types/cleek-options';

const props = defineProps<{
  size?: Size; // default s
  color?: Color;
  textColor?: Color;
  align?: Align;
  // icon
  icon?: Icon;
  iconRight?: Icon;
  iconPack?: IconPack;
}>();

const defaultColor = 'primary';
const defaultSize = 's';

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const computedClass = computed(() => {
  const list = [];
  list.push(`size-${props.size || defaultSize}`);
  list.push(`ck-component__bg-color--${props.color || defaultColor}`);
  if (props.align) list.push(`align--${props.align}`)
  return list;
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
  ck-icon.pr-2(
  v-if="icon && !iconRight"
  :icon="icon"
  :icon-pack="iconPack"
  )
  span
    slot
  ck-icon.pl-2(
  v-if="icon && iconRight"
  :icon="icon"
  :icon-pack="iconPack"
  )
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
  &.align--left
    justify-content flex-start
  &.align--right
    justify-content flex-end
</style>
