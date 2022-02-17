<template lang="pug">
.ck-img(
:class="computedClass"
:style="computedStyle"
@click="clickImg()"
)
  img(
  :src="imageUrl"
  :style="computedImgStyle"
  :alt="alt"
  @error="altNeeded = true"
  )
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import functions from '../utils/functions';
import globalVariables from '../utils/globalVariables';
import validators from '../utils/validators';

const altNeeded = ref(false);

const props = defineProps({
  // src
  src: { type: String, default: '' },
  isFullPath: { type: Boolean, default: false },
  failImgSrc: { type: String, default: '' },
  alt: { type: String, default: '' },
  // size
  size: { type: String, default: '', validator: validators.size },
  sizeAbsolute: { type: String, default: '' },
  width: { type: String, default: '' },
  height: { type: String, default: '' },
  // zoom
  zoom: { type: Boolean, default: false }, // check
  zoomTitle: { type: String, default: '' }, // check
  // border
  hasBorder: { type: Boolean, default: false },
  radius: { type: String, default: '' },
  borderColor: { type: String, default: '' }, // check
});

let context;
let isMounted = ref(false);

const imageUrl = computed(() => {
  if (!isMounted.value) return '';
  if (props.isFullPath) return props.src;
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
  let size = props.size;
  // size
  if (!size && !props.sizeAbsolute && !props.width && !props.height) {
    size = 'm';
  }
  if (size) classList.push(`ck-img__size--${size}`);
  // border
  if (props.hasBorder) {
    classList.push('ck-img__has-border');
    if (functions.isColorTemplateVariable(realBorderColor.value)) {
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
  if (props.radius) styleList.push({ 'border-radius': props.radius });
  // border
  if (props.hasBorder) {
    if (!functions.isColorTemplateVariable(realBorderColor.value)) {
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
function getImg(src) {
  let path = '';
  const $cleekOptions = functions.getCleekOptions(getCurrentInstance);
  if ($cleekOptions) {
    if ($cleekOptions.imgPath) path = $cleekOptions.imgPath;
  }
  return `${path}${src}`;
}

onMounted(() => {
  context = getCurrentInstance().ctx;
  isMounted.value = true;
});
</script>

<style lang="stylus" scoped>
@require '../styles/index'

.ck-img
  display inline-flex
  border-radius .5rem
  overflow hidden
  flex-shrink 0
  flex-grow 0
  max-width 100%
  max-height 100%
  &.ck-img__has-border
    background-color white
    border 1px solid transparent
  &.zoom-able
    transition .5s
    cursor pointer
    &:hover
      border-color primary
  img
    display block
    width auto
    max-height 100%
    max-width 100%
    margin auto
  &.ck-img__size--xxs
    width 2rem
    height @width
    border-radius .25rem
  &.ck-img__size--xs
    width 2.5rem
    height @width
    border-radius .25rem
  &.ck-img__size--s
    width 4rem
    height @width
    border-radius .5rem
  &.ck-img__size--m
    width 7rem
    height @width
    border-radius .5rem
  &.ck-img__size--l
    width 11rem
    height @width
    border-radius 1.25rem
  &.ck-img__size--xl
    width 15rem
    height @width
    border-radius 1.5rem
</style>
