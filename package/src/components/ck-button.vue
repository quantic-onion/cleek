<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
// components
import CkIcon from './ck-icon.vue';
// hooks
import functions from '../utils/functions';
import useWindowWidth from '../hooks/windowWidth';
// types
import type { CleekOptions } from '../types/cleek-options';

const props = defineProps<{
  // html
  title?: string;
  disabled?: boolean;
  // style
  type?: 'filled' | 'outlined' | 'flat'
  color?: string;
  align?: 'left' | 'center' | 'right';
  size?:  | 'xs' | 's' | 'm' | 'l' | 'xl';
  width?: string;
  rounded?: boolean;
  // icon
  icon?: string | [string, string];
  iconRight?: string | [string, string];
  iconPack?: 'font-awesome' | 'feather';
  // label
  label?: string;
  labelAlign?: 'left' | 'center' | 'right';
  // group
  widthBreaks?: [number, string][];
  group?: 'left' | 'right' | 'center';
  groupVertical?: 'top' | 'bottom' | 'center';
}>();

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const { windowWidth } = useWindowWidth();

const defaultButtonType = 'outlined';
const defaultColor = 'primary';
const defaultAlign = 'left';

let $cleekOptions: CleekOptions;
const isMounted = ref(false);


const realButtonType = computed(() => {
  if (props.type) return props.type;
  if (isMounted.value) {
    if ($cleekOptions) return $cleekOptions.button.type;
  }
  return defaultButtonType;
});
const computedClass = computed(() => {
  const list = [];
  // group
  list.push(functions.getGroupClass(props, windowWidth.value));
  // color
  const color = props.color || defaultColor;
  if (color !== defaultColor) {
    if (realButtonType.value === 'filled') {
      list.push(`ck-component__bg-color--${props.color}`);
    } else {
      list.push(`ck-component__border-color--${props.color}`);
    }
  }
  // align
  const align = props.align || defaultAlign;
  if (align === 'center' || align === 'right') {
    list.push(`ck-button__align--${props.align}`);
  }
  // rounded
  if (props.rounded) console.log('rounded');
  if (props.rounded) list.push('rounded');
  // type
  list.push(`type-${realButtonType.value}`);
  // size
  if (props.size) list.push(`ck-button-size__${props.size}`);
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // width-break
  let isWidthDefined = false;
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value )
    if (width) {
      isWidthDefined = true;
      list.push({ width });
    }
  }
  // width
  if (props.width && !isWidthDefined) list.push({ width: props.width });
  return list;
});

function onClick(event: Event) {
  emits('click', event)
}

onMounted(() => {
  $cleekOptions = functions.getCleekOptions(getCurrentInstance);
  isMounted.value = true;
});

functions.preventUnusedError([
  onClick,
  computedStyle,
  computedClass,
]);
</script>

<template lang="pug">
button(
type="button"
:class="computedClass"
:title="title"
:aria-label="title"
:disabled="disabled"
:style="computedStyle"
@click="onClick($event)"
)
  ck-icon.ck-button__icon-left(
  v-if="icon"
  :icon="icon"
  :icon-pack="iconPack"
  :class="{ 'just-icon': !$slots.default }"
  )
  slot
  ck-icon.ck-button__icon-right(
  v-if="iconRight"
  :icon="iconRight"
  :icon-pack="iconPack"
  :class="{ 'just-icon': !$slots.default }"
  )
</template>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

button
  cursor pointer
  display inline-flex
  align-items center
  min-height $globalMinHeight
  border-radius $globalBorderRadius
  position relative
  font-size $globalFontSize
  padding $globalPadding (2 * $globalPadding)
  justify-content flex-start
  background-color white
  &.ck-button__align--center
    justify-content center
  &.ck-button__align--right
    justify-content flex-end
  &::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    border-radius 4px
    z-index 1
    opacity 0
    transition opacity 0.15s ease-in-out
    background-color var(--primary)
  &:hover::before
    opacity 0.1
  &:active::before
    opacity 0.2
  &.type-filled
    background-color var(--primary)
    border 1px solid var(--primary)
    color white
  &.rounded
    border-radius 10rem
    &::before
      border-radius 10rem
  &.type-outlined
    // background-color transparent
    border 1px solid var(--primary)
    color var(--primary)
  &.type-flat
    background-color transparent
    border none
    color var(--primary)
  &.type-filled:disabled,
  &.type-outlined:disabled,
  &.type-flat:disabled
    border-color #eeeeee
    background-color #eeeeee
    cursor not-allowed
  &:disabled::before
    display none
  &:disabled > span
    color $color-disabled
  > .ck-button__icon-left
    margin-right .5rem
    &.just-icon
      margin-right 0
  > .ck-button__icon-right
    margin-left .5rem
    &.just-icon
      margin-left 0
  &.ck-button-size__s
    font-size .7rem
    min-height unset
    padding .35rem .5rem
  &.ck-button-size__l
    font-size 1.2rem
    padding .75rem 1.5rem
</style>
