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
});

const computedClass = computed(() => {
  const list = [];
  // align
  let align = 'left';
  if (props.align === 'center' || props.align === 'right') align = props.align;
  list.push(`ck-align--${align}`);
  return list;
});
</script>

<style lang="stylus" scoped>
@require '../styles/ck-styles'

.ck-label
  width 100%
  padding-x 5px
  display flex
  font-size 13.5px
  &.ck-align--left
    justify-content flex-start
  &.ck-align--right
    justify-content flex-end
  &.ck-align--center
    justify-content center
</style>