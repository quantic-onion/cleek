<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// hooks
import hooks from '../utils/global-hooks';
import globalVariables from '../utils/globalVariables';
// types
import type { CleekOptions, Color, Size, SizeInCSS } from '../types/cleek-options';

const props = defineProps<{
  // src
  src: string;
  // failImgSrc?: string; // TODO
  alt?: string;
  // size
  size?: Size;
  sizeAbsolute?: SizeInCSS;
  width?: SizeInCSS;
  height?: SizeInCSS;
  // zoom
  zoom: boolean; // TODO
  zoomTitle: string; // TODO
  // border
  hasBorder?: boolean;
  borderColor: Color;
  // style
  rounded?: boolean;
  radius?: SizeInCSS;
  // image-type
  static: boolean;
  dynamic: boolean;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();
const altNeeded = ref(false);
const isMounted = ref(false);

const isFullPath = computed(() => {
  return props.src.substring(0, 4) === 'http';
});

const imageUrl = computed(() => {
  if (!isMounted.value) return '';
  if (isFullPath.value) return props.src;
  // if (altNeeded.value) {
  //   let failImgSrc = props.failImgSrc;
  //   if (!failImgSrc && globalVariables.defaultFailImg) {
  //     failImgSrc = globalVariables.defaultFailImg;
  //   }
  //   return getImg(failImgSrc);
  // }
  return getImg(props.src);
});
const computedClass = computed(() => {
  const classList = [];
  // let size = props.size;
  // size
  // if (!size && !props.sizeAbsolute && !props.width && !props.height) {
  //   size = 'm';
  // }
  if (props.size) classList.push(`ck-img__size--${props.size}`);
  // rounded
  if (props.rounded) classList.push('is-rounded');
  // border
  if (props.hasBorder) {
    classList.push('ck-img__has-border');
    if (hooks.isColorTemplateVariable(realBorderColor.value)) {
      classList.push(`ck-component__border-color--${realBorderColor.value}`);
    }
  }
  // zoom
  if (props.zoom) classList.push('zoom-able');
  return classList;
});
const computedStyle = computed(() => {
  const styleList = [];
  // sizeAbsolute
  if (props.sizeAbsolute) {
    styleList.push({ width: props.sizeAbsolute });
    styleList.push({ height: props.sizeAbsolute });
  }
  // radius
  let radius = props.radius;
  if (typeof props.radius === 'undefined' && cleekOptions.value?.styles.layout === 'squared') {
    radius = '0px';
  }
  if (radius) styleList.push({ 'border-radius': radius });
  // border
  if (props.hasBorder) {
    if (!hooks.isColorTemplateVariable(realBorderColor.value)) {
      styleList.push({ 'border-color': realBorderColor.value });
    }
  }
  return styleList;
});
const computedImgStyle = computed(() => {
  const styleList = [];
  if (props.radius) styleList.push({ 'border-radius': props.radius });
  if (props.width) styleList.push({ width: props.width });
  if (props.height) styleList.push({ height: props.height });
  return styleList;
});
const realBorderColor = computed(() => {
  if (props.borderColor) return props.borderColor;
  return globalVariables.defaultImgBorderColor;
});

function clickImg() {
  if (props.zoom) {
    // store.dispatch('layout/setZoomImgPath', imageUrl.value);
    // if (props.zoomTitle) {
    //   return store.dispatch('layout/setZoomImgTitle', props.zoomTitle);
    // }
  }
}
function getImg(src: string) {
  let basePath = cleekOptions.value?.img.basePath;
  if (cleekOptions.value?.img.basePath) basePath = cleekOptions.value?.img.basePath;
  if (!basePath) basePath = cleekOptions.value?.img.basePathStatic;
  if (props.dynamic) basePath = cleekOptions.value?.img.basePathDynamic;
  return `${basePath}${src}`;
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
  isMounted.value = true;
});
</script>

<template>
<div
  class="ck-img"
  :class="computedClass"
  :style="computedStyle"
  @click="clickImg()"
>
  <img
    :src="imageUrl"
    :style="computedImgStyle"
    :alt="alt"
    @error="altNeeded = true"
  />
</div>
</template>

<style lang="stylus" scoped>
@require '../styles/index'

.ck-img
  display inline-flex
  border-radius 0.5rem
  overflow hidden
  flex-shrink 0
  flex-grow 0
  max-width 100%
  max-height 100%
  &.ck-img__has-border
    background-color white
    border 1px solid transparent
  &.zoom-able
    transition 0.5s
    cursor pointer
    &:hover
      border-color primary
  &.is-rounded img
    border-radius 100%
  img
    display block
    width auto
    max-height 100%
    max-width 100%
    margin auto
  &.ck-img__size--xxs
    width 2rem
    height @width
    border-radius 0.25rem
  &.ck-img__size--xs
    width 2.5rem
    height @width
    border-radius 0.25rem
  &.ck-img__size--s
    width 4rem
    height @width
    border-radius 0.5rem
  &.ck-img__size--m
    width 7rem
    height @width
    border-radius 0.5rem
  &.ck-img__size--l
    width 11rem
    height @width
    border-radius 1.25rem
  &.ck-img__size--xl
    width 15rem
    height @width
    border-radius 1.5rem
</style>
