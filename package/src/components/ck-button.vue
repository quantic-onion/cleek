<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// components
import CkIcon from './ck-icon.vue';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type {
  Align,
  AlignVertical,
  Color,
  Icon,
  IconPack,
  Layout,
  ButtonType,
  WidthBreaks,
} from '../cleek-options/cleek-options.types';

const props = defineProps<{
  // html
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  tabindex?: number;
  // style
  type?: ButtonType;
  color?: Color;
  textColor?: Color;
  backgroundColor?: Color;
  align?: Align;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  width?: string;
  layout?: Layout;
  // icon
  icon?: Icon;
  iconRight?: Icon;
  iconPack?: IconPack;
  // label
  label?: string;
  labelAlign?: Align;
  // group
  widthBreaks?: WidthBreaks;
  group?: Align;
  groupVertical?: AlignVertical;
}>();

const defaultBackgroundColor = 'transparent'; // move to default file
const defaultButtonType = 'outlined'; // move to default file
const defaultColor = 'primary'; // move to default file
const defaultAlign = 'left'; // move to default file
const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();

const finalButtonType = computed(() => {
  if (props.type) return props.type;
  if (cleekOptions.value) return cleekOptions.value.button.type;
  return defaultButtonType;
});
const finalBackgroundColor = computed(() => {
  if (props.backgroundColor) return props.backgroundColor;
  if (cleekOptions.value && !props.type) return cleekOptions.value.button.backgroundColor;
  return defaultBackgroundColor;
});
const finalTextColor = computed(() => {
  if (props.textColor) return props.textColor;
  if (cleekOptions.value && !props.type) return cleekOptions.value.button.textColor;
  return '';
});
const computedClass = computed(() => {
  const list = [];
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  // color
  const color = props.color || defaultColor;
  if (color !== defaultColor) {
    if (finalButtonType.value === 'filled') {
      list.push(`ck-component__bg-color--${props.color}`);
    } else {
      list.push(`ck-component__border-color--${props.color}`);
    }
  }
  // backgroundColor
  if (finalBackgroundColor.value !== defaultBackgroundColor && hooks.isColorTemplateVariable(finalBackgroundColor.value)) {
    list.push(`ck-component__bg-color--${finalBackgroundColor.value}`);
  }
  // textColor
  if (finalTextColor.value && hooks.isColorTemplateVariable(finalTextColor.value)) {
    list.push(`ck-component__color--${finalTextColor.value}`);
  }
  // align
  const align = props.align || defaultAlign;
  if (align === 'center' || align === 'right') {
    list.push(`ck-button__align--${props.align}`);
  }
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(layout);
  // type
  list.push(`type-${finalButtonType.value}`);
  // size
  if (props.size) list.push(`ck-button-size__${props.size}`);
  // isLoading
  if (props.isLoading) list.push('is-loading-btn');
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // width-break
  let isWidthDefined = false;
  if (props.widthBreaks) {
    const width = hooks.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value);
    if (width) {
      isWidthDefined = true;
      list.push({ width });
    }
  }
  // textColor
  if (finalTextColor.value && !hooks.isColorTemplateVariable(finalTextColor.value)) {
    list.push({ color: `${finalTextColor.value} !important` });
  }
  // width
  if (props.width && !isWidthDefined) list.push({ width: props.width });
  // backgroundColor
  if (finalBackgroundColor.value !== defaultBackgroundColor && !hooks.isColorTemplateVariable(finalBackgroundColor.value)) {
    list.push({ 'background-color': finalBackgroundColor.value });
  }
  if (props.color && !hooks.isColorTemplateVariable(props.color)) {
    if (finalButtonType.value === 'outlined') {
      list.push({ 'border-color': props.color });
      list.push({ color: props.color });
    } else if (finalButtonType.value === 'filled') {
      list.push({ color: 'white' });
      list.push({ 'border-color': props.color });
      list.push({ 'background-color': props.color });
    } else if (finalButtonType.value === 'flat') {
      list.push({ color: props.color });
    }
  }
  return list;
});
</script>

<template>
  <button
    type="button"
    :class="computedClass"
    :title="title"
    :aria-label="title"
    :disabled="disabled"
    :tabindex="tabindex"
    :style="computedStyle"
  >
    <ck-icon v-if="isLoading" icon="spinner" spin />
    <template v-else>
      <ck-icon
        class="ck-button__icon-left"
        v-if="icon"
        :icon="icon"
        :icon-pack="iconPack"
        :class="{ 'just-icon': !$slots.default }"
      />
      <slot />
      <ck-icon
        v-if="iconRight"
        class="ck-button__icon-right"
        :icon="iconRight"
        :icon-pack="iconPack"
        :class="{ 'just-icon': !$slots.default }"
      />
    </template>
  </button>
</template>

<style lang="stylus" scoped>
button
  cursor pointer
  display inline-flex
  align-items center
  min-height $globalMinHeight
  border-radius $globalBorderRadius
  position relative
  font-size $globalFontSize
  padding $globalPadding 2 * $globalPadding
  justify-content flex-start
  background-color transparent
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
  &.squared
    border-radius 0
    &::before
      border-radius 0
  &.type-outlined
    // background-color transparent
    border 1px solid var(--primary)
    color var(--primary)
  &.type-flat
    background-color transparent
    border none
    color var(--primary)
  &.type-filled:disabled
  &.type-outlined:disabled
  &.type-flat:disabled
    border-color #eeeeee
    background-color #eeeeee
    cursor not-allowed
  &:disabled::before
    display none
  &:disabled > span
    color $color-disabled
  > .ck-button__icon-left
    margin-right 0.5rem
    &.just-icon
      margin-right 0
  > .ck-button__icon-right
    margin-left 0.5rem
    &.just-icon
      margin-left 0
  &.ck-button-size__xs
    font-size 0.5rem
    min-height unset
    padding 0.2rem 0.35rem
  &.ck-button-size__s
    font-size 0.7rem
    min-height unset
    padding 0.35rem 0.5rem
  &.ck-button-size__l
    font-size 1.2rem
    padding 0.75rem 1.5rem

.is-loading-btn
  cursor initial // could be 'not-allowed' also
</style>
