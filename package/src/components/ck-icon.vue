<script setup lang="ts">
import { computed } from 'vue';
// libraries
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// hooks
import hooks from '../utils/global-hooks';
// @ts-ignore // fixme
import type { Color, Icon, IconPack, Size, SizeInCSS } from '../types/cleek-options';

const props = defineProps<{
  icon: Icon;
  iconPack?: IconPack;
  color?: Color;
  size?: Size | SizeInCSS | string; // SizeInCSS || 6x
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
  if (props.iconPack === 'cleek') return props.iconPack;
  if (props.iconPack === 'feather') return props.iconPack;
  return defaultPackage;
});
const computedClass = computed(() => {
  const classes = [];
  // color
  if (props.color && hooks.isColorTemplateVariable(props.color)) {
    classes.push(`ck-component__color--${props.color}`);
  }
  // size
  if (props.size) classes.push(`ck-icon__size-${props.size}`);
  return classes;
});
const computedStyle = computed(() => {
  const styles: any = [];
  // color
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    styles.push({ color: props.color });
  }
  return styles;
});

function onClick(event: Event) {
  emits('click', event);
}

/// CLEEK CUSTOM ICON
const iconMask = computed(() => {
  const src = `/src/assets/icons/` + `${props.icon}.svg`;
  return `mask: url(${src}) no-repeat center; -webkit-mask: url(${src}) no-repeat center;`;
});
const ckIconComputedClass = computed(() => {
  const classes = [];
  // color
  if (!props.color) {
    classes.push(`ck-component__color--primary`);
  } else if (props.color && hooks.isColorTemplateVariable(props.color)) {
    classes.push(`ck-component__color-background--${props.color}`);
  }
  console.log('TAMAÑO', props.icon, props.size);
  if (props.size) classes.push(`ck-icon__cleek-small`);
  if (props.size === 'm') classes.push(`ck-icon__cleek-medium`);
  if (props.size === 'l') classes.push(`ck-icon__cleek-large`);
  return classes;
});
</script>

<template>
  <div
    class="ck-icon"
    :class="computedClass"
    :style="computedStyle"
    @click="onClick($event)"
  >
    <!-- :size="(size as string)" -->
    <font-awesome-icon
      v-if="computediconPack === 'font-awesome'"
      :icon="icon"
      :rotation="rotation"
      :flip="flip"
      :spin="spin"
      :pulse="pulse"
      :fixedWidth="(fixedWidth as string)"
    />
    <div
      v-else-if="computediconPack === 'cleek'"
      :style="iconMask"
      :class="ckIconComputedClass"
      class="ck-icon__cleek"
    />
  </div>
</template>

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
// size
.ck-icon__size-xs
  font-size 0.5rem
.ck-icon__size-s
  font-size 0.75rem
.ck-icon__size-m
  font-size 1rem
.ck-icon__size-l
  font-size 1.5rem
.ck-icon__size-xl
  font-size 2.5rem
.ck-icon__size-xxl
  font-size 4rem
// size cleek icon
.ck-icon__cleek-small
  width 1rem
  height 1rem
.ck-icon__cleek-medium
  width 2rem
  height 2rem
.ck-icon__cleek-large
  width 3rem
  height 3rem
</style>
