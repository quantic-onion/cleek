<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Color, Icon, IconPack, Size } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  size?: Size; // default m
  sizeInPx?: Size;
  color?: Color;
  textColor?: Color;
  // icon
  icon?: Icon;
  iconPack?: IconPack;
}>();

const emits = defineEmits<{
  (e: 'click', domEvent: DomEvent): void;
}>();

const defaultColor = 'primary';
const defaulSize = 'm';
const defaultTextColor = 'white';

const computedClass = computed(() => {
  const classes: string[] = [];
  // size
  let size = props.size;
  if (props.size !== 's' && props.size !== 'l' && props.size !== 'xs') size = defaulSize;
  classes.push(`ck-circle__size-${size}`);
  // color
  classes.push(`ck-component__bg-color--${props.color || defaultColor}`);
  return classes;
});
const computedStyle = computed(() => {
  const styles: any = [];
  if (props.sizeInPx) {
    styles.push({ height: props.sizeInPx });
    styles.push({ width: props.sizeInPx });
  }
  if (props.color || hooks.isColorTemplateVariable(props.color)) {
    styles.push({ backgroundColor: props.color });
    styles.push({ color: props.textColor || defaultTextColor });
  }
  return styles;
});
</script>

<template>
  <div
    class="om-circle"
    :style="computedStyle"
    :class="computedClass"
    @click="emits('click', $event)"
  >
    <ck-icon v-if="icon" :icon="icon" :iconPack="iconPack" />
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.om-circle
  border-radius 50%
  display inline-flex
  align-items center
  justify-content center
  &.ck-circle__size-xs
    width 1.35rem
    height @width
    font-size 0.6rem
  &.ck-circle__size-s
    width 1.75rem
    height @width
    font-size 0.75rem
  &.ck-circle__size-m
    width 2.25rem
    height @width
    font-size 0.9rem
  &.ck-circle__size-l
    width 3rem
    height @width
    font-size 1.25rem
</style>
