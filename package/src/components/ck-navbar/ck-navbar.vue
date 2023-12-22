<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// types
import type { CleekOptions, Color } from '../../types/cleek-options';
// hooks
import hooks from '../../utils/global-hooks';

const props = defineProps<{
  backgroundColor?: Color;
  padding?: string;
  position?: string;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();
const defaultPosition = 'fixed';

const computedClassContent = computed(() => {
  const list = [];
  if (props.padding) list.push('has-padding');
  return list;
});

const computedStyle = computed(() => {
  const list = [];
  // padding
  if (props.padding) list.push({ padding: props.padding });
  // position
  const position = props.position || defaultPosition;
  if (position) list.push({ position: position });
  return list;
});
const computedStyleContent = computed(() => {
  const list = [];
  let backgroundColor = '';
  if (cleekOptions.value?.darkMode) backgroundColor = cleekOptions.value?.darkModeColorItems;
  if (props.backgroundColor) backgroundColor = props.backgroundColor;
  if (backgroundColor) list.push({ backgroundColor: backgroundColor });
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
<div class="ck-navbar" :style="computedStyle">
  <div
    class="ck-navbar__content"
    :class="computedClassContent"
    :style="computedStyleContent"
  >
    <slot/>
  </div> 
</div> 
</template>

<style lang="stylus" scoped>
@import '../../styles/index.styl'

.ck-navbar
  width 100%
  top 0
  z-index 99
  .ck-navbar__content
    padding 0.75rem 1rem
    background-color white
    width 100%
    ck-box-shadow()
    &.has-padding
      border-radius 0.5rem
</style>
