<script setup lang="ts">
import { computed } from 'vue';
// hooks
import functions from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';

const props = defineProps<{
  widthBreaks?: [number, string][];
  block?: boolean;
}>();

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const { windowWidth } = useWindowWidth();

const computedStyle = computed(() => {
  const list = [];
  // width-break
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value);
    if (width) list.push({ width });
  }
  // block
  if (props.block) list.push({ display: 'block' });
  return list;
});
</script>

<template lang="pug">
.ck-div(:style='computedStyle', @click='emits("click", $event)')
  slot
</template>

<style lang="stylus">
.ck-div
  display inline-flex
  align-items flex-end
  flex-wrap wrap
  row-gap 0.5rem
</style>
