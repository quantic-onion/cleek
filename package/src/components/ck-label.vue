<template lang="pug">
label.ck-label(
:for="for"
:class="computedClass"
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  for: { type: String, default: '' },
  align: { type: String, default: '' },
  size: { type: String, default: 'm' },
});

const computedClass = computed(() => {
  const list = [];
  // align
  let align = 'left';
  if (props.align === 'center' || props.align === 'right') align = props.align;
  list.push(`ck-align--${align}`);
  // size
  list.push(`ck-size--${props.size}`);
  return list;
});
</script>

<style lang="stylus" scoped>
@require '../styles/index'

.ck-label
  width 100%
  padding-x .5rem
  display flex
  font-size .9rem
  color #626262
  &.ck-align--left
    justify-content flex-start
  &.ck-align--right
    justify-content flex-end
  &.ck-align--center
    justify-content center
  &.ck-size--s
    font-size .7rem
  &.ck-size--l
    padding-x .5rem
    font-size 1.25rem
  &.ck-size--xl
    padding-x .75rem
    font-size 1.5rem
</style>