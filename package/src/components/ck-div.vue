<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import functions from '../utils/functions';
import useWindowWidth from '../hooks/windowWidth';

type widthBreakItem = [windowBreak: number, width: string]

const { windowWidth } = useWindowWidth();

const props = defineProps({
  widthBreaks: { type: Array as PropType<widthBreakItem | widthBreakItem[]>, default: undefined },
});

const emits = defineEmits(['click']);

const computedStyle = computed(() => {
  const list = [];
  // width-break
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value )
    if (width) list.push({ width });
  }
  return list;
});
</script>

<template lang="pug">
.ck-div(
:style="computedStyle"
@click="emits('click', $event)"
)
  slot
</template>

<style lang="stylus">
.ck-div
  display inline-flex
  align-items flex-end
</style>