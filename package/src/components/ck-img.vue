<template lang="pug">
.ck-img(
:class="computedClass"
:style="computedStyle"
@click="clickImg()"
)
  img(
  :src="imageUrl"
  :style="computedImgStyle"
  @error="altNeeded = true"
  )
</template>

<script>
import functions from '../utils/functions';
import globalVariables from '../utils/globalVariables';
import validators from '../utils/validators';
export default {
  props: {
    // src
    src: { type: String, default: '' },
    isFullPath: { type: Boolean, default: false },
    failImgSrc: { type: String, default: '' },
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
  },
  computed: {
    imageUrl() {
      if (this.isFullPath) return this.src;
      // if (this.altNeeded) {
      //   let failImgSrc = this.failImgSrc;
      //   if (!failImgSrc && globalVariables.defaultFailImg) {
      //     failImgSrc = globalVariables.defaultFailImg;
      //   }
      //   return this.getImg(failImgSrc);
      // }
      return this.getImg(this.src);
    },
    computedClass() {
      const classList = [];
      // size
      let { size } = this;
      if (size === 'default' && !this.sizeAbsolute && !this.width && !this.height) {
        size = 'm';
      }
      if (size) classList.push(`ck-img__size--${size}`);
      // border
      if (this.hasBorder) {
        classList.push('ck-img__has-border');
        if (functions.isColorTemplateVariable(this.realBorderColor)) {
          classList.push(`ck-component__border-color--${this.realBorderColor}`);
        }
      }
      // zoom
      if (this.zoom) classList.push('zoom-able');
      return classList;
    },
    computedStyle() {
      const styleList = [];
      // sizeAbsolute
      if (this.sizeAbsolute) {
        styleList.push({ width: this.sizeAbsolute });
        styleList.push({ height: this.sizeAbsolute });
      }
      // radius
      if (this.radius) styleList.push({ 'border-radius': this.radius });
      // border
      if (this.hasBorder) {
        if (!functions.isColorTemplateVariable(this.realBorderColor)) {
          styleList.push({ 'border-color': this.realBorderColor });
        }
      }
      return styleList;
    },
    computedImgStyle() {
      const styleList = [];
      if (this.radius) styleList.push({ 'border-radius': this.radius });
      if (this.width) styleList.push({ width: this.width });
      if (this.height) styleList.push({ height: this.height });
      return styleList;
    },
    realBorderColor() {
      if (this.borderColor) return this.borderColor;
      return globalVariables.defaultImgBorderColor;
    },
  }, // computed
  methods: {
    // clickImg

    clickImg() {
      if (this.zoom) {
        console.log('hola');
        this.$store.dispatch('layout/setZoomImgPath', this.imageUrl);
        if (this.zoomTitle) {
          return this.$store.dispatch('layout/setZoomImgTitle', this.zoomTitle);
        }
      }
    },
    getImg(src) {
      return `${globalVariables.imagesFolderPath}${src}`;
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@require '../styles/ck-styles'

.ck-img
  display inline-flex
  border-radius .5rem
  overflow hidden
  flex-shrink 0
  flex-grow 0
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
    border-radius 1rem
  &.ck-img__size--l
    width 11rem
    height @width
    border-radius 1.25rem
  &.ck-img__size--xl
    width 15rem
    height @width
    border-radius 1.5rem
</style>
