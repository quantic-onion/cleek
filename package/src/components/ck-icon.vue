<script setup lang="ts">
import { computed } from 'vue';
// libraries
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// hooks
// import hooks from './utils/global-hooks'; // FIXME
// @ts-ignore // fixme
import type { Color, Icon, IconPack, SizeInCSS } from '../types/cleek-options';

const props = defineProps<{
  icon: Icon;
  iconPack?: IconPack;
  color?: Color;
  size?: string; // SizeInCSS || 6x
  flip?: 'horizontal' | 'vertical' | 'both';
  fixedWidth?: SizeInCSS;
  rotation?: 90 | 180 | 270 | '90' | '180' | '270';
  spin?: boolean; // true actives animation
  pulse?: boolean; // true actives animation
}>();

const emits = defineEmits(['click']);

const computediconPack = computed(() => {
  const defaultPackage = 'font-awesome';
  if (!props.iconPack) return defaultPackage;
  if (props.iconPack === 'feather') return props.iconPack;
  return defaultPackage;
});
const computedClass = computed(() => {
  const list = [];
  // group
  // FIXME
  // if (props.color && hooks.isColorTemplateVariable(props.color)) {
  //   list.push(`ck-component__color--${props.color}`);
  // }
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // group
  // FIXME
  // if (props.color && !hooks.isColorTemplateVariable(props.color)) {
  //   list.push({ color: props.color })
  // }
  return list;
});

function onClick(event: Event) {
  emits('click', event)
}
</script>

<template lang="pug">
.ck-icon(
:class="computedClass"
:style="computedStyle"
@click="onClick($event)"
)
  font-awesome-icon(
  v-if="computediconPack === 'font-awesome'"
  :icon="icon"
  :size="size"
  :rotation="rotation"
  :flip="flip"
  :spin="spin"
  :pulse="pulse"
  :fixed-width="fixedWidth"
  )
</template>

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
</style>