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

<script setup lang="ts">
import { computed } from 'vue';
import ckIcon from './ck-icon.vue';

const props = defineProps({
  size: { type: String, default: 's' },
  color: { type: String, default: 'primary' },
  textColor: { type: String, default: undefined },
  // icon
  icon: { type: String, default: undefined },
  iconPack: { type: String, default: undefined },
});

const emits = defineEmits(['click']);

const computedClass = computed(() => {
  return [
    `size-${props.size}`,
    `ck-component__bg-color--${props.color}`,
  ];
});
const computedStyle = computed(() => {
  const list = [];
  if (props.color) {
    // list.push({ backgroundColor: props.color });
    // if (props.color !== 'light') {
    //   list.push({ color: props.textColor || 'white' });
    // }
  }
  return list;
});
</script>

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
