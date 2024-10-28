<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// types
import type { SizeInCSS } from '../cleek-options/cleek-options.types';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';

const props = defineProps<{
  widthBreaks?: [number, string][];
  block?: boolean;
  gap: SizeInCSS;
}>();

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();

const computedStyle = computed(() => {
  const list = [];
  // width-break
  if (props.widthBreaks) {
    const width = hooks.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value);
    if (width) list.push({ width });
  }
  // gap
  const gap = props.gap || cleekOptions.value.div.gap;
  if (gap) list.push({ gap });
  // block
  if (props.block) list.push({ display: 'block' });
  return list;
});
</script>

<template>
<div
  class="ck-div"
  :style="computedStyle"
  @click="emits('click', $event)"
>
  <slot/>
</div>
</template>

<style lang="stylus">
.ck-div
  width 100%
  display inline-flex
  align-items flex-end
  flex-wrap wrap
  row-gap 0.5rem
</style>
