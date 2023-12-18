<script setup lang="ts">
import { computed } from 'vue';
// components
import CkIcon from './ck-icon.vue';
// types
import type { Align, Color, Icon, IconPack, Size } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  size?: Size; // default s
  color?: Color;
  textColor?: Color;
  align?: Align;
  nowrap?: boolean;
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
  // color
  if (!props.color || hooks.isColorTemplateVariable(props.color)) {
    list.push(`ck-component__bg-color--${props.color || defaultColor}`);
  }
  // size
  list.push(`size-${props.size || defaultSize}`);
  // align
  if (props.align) list.push(`align--${props.align}`);
  if (props.nowrap) list.push(`ck-chip--${props.nowrap}`);
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    list.push({ backgroundColor: props.color });
    list.push({ color: props.textColor || 'white' });
  }
  return list;
  return [];
});
</script>

<template lang="pug">
.ck-chip(:color="color" :class="computedClass" :style="computedStyle" @click="emits('click', $event)")
  ck-icon.pr-2(v-if="icon && !iconRight" :icon="icon" :icon-pack="iconPack")
  span
    slot
  ck-icon.pl-2(v-if="icon && iconRight" :icon="icon" :icon-pack="iconPack")
</template>

<style lang="stylus" scoped>
@require '../styles/index'

.ck-chip
  text-align center
  display inline-flex
  align-items center
  justify-content center
  font-size 0.75rem
  padding 0.3rem 0.75rem
  border-radius 10rem
  &.ck-chip--nowrap
    white-space nowrap
  &.size-xs
    font-size 0.6rem
  &.size-m
    font-size 0.95rem
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
