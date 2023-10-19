<script setup lang="ts">
import { computed } from 'vue';
// types
import type { Color } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  modelValue: boolean;
  title?: string;
  width?: string;
  rightSide?: boolean;
  headerColor?: Color;
  headerAlign?: boolean;
  closeBtnAlign?: 'left' | 'right';
  notCloseBtn?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isActive = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emits('update:modelValue', val);
  },
});

const computedClass = computed(() => {
  return {
    'right-side': props.rightSide,
  };
});
const computedStyle = computed(() => {
  const list = [];
  if (props.width) list.push({ width: props.width });
  return list;
});
const computedClassHeader = computed(() => {
  const list = [];
  // closeBtnAlign
  let closeBtnAlign: 'left' | 'right' | 'hidden' | undefined = props.closeBtnAlign;
  if (props.notCloseBtn) closeBtnAlign = 'hidden';
  if (closeBtnAlign) list.push(`close-btn--${closeBtnAlign}`);
  // closeBtnAlign
  if (props.headerAlign) list.push(`align-title--${props.headerAlign}`);
  // headerColor
  if (props.headerColor && hooks.isColorTemplateVariable(props.headerColor)) {
    list.push(`ck-component__bg-color--${props.headerColor}`);
  }
  if (props.headerColor) list.push(`align-title--${props.headerColor}`);
  return list;
});
const computedStyleHeader = computed(() => {
  const list = [];
  // headerColor
  if (props.headerColor && !hooks.isColorTemplateVariable(props.headerColor)) {
    list.push({ 'background-color': props.headerColor });
  }
  return list;
});
</script>

<template lang="pug">
.ck-sidebar-background(v-if="isActive" @click.self="isActive = false")
  .sidebar-content(:class="computedClass" :style="computedStyle")
    //- header
    .sidebar-header(v-if="title" :class="computedClassHeader" :style="computedStyleHeader" @click="isActive = false")
      .sidebar-header-title(v-if="title")
        | {{ title }}
      ck-icon.close-btn(icon="times")
    //- content
    div
      slot
</template>

<style lang="stylus" scoped>
.ck-sidebar-background
  z-index 1000
  position fixed
  background rgba(0, 0, 0, 0.5)
  width 100%
  height 100%
  bottom 0
  -webkit-transition all 0.3s ease
  transition all 0.3s ease
  opacity 1
  left 0
  .sidebar-content
    background-color white
    z-index 10000
    left 0
    height 100%
    position fixed
    width 450px
    @media (max-width: 1023px)
      width 400px
    @media (max-width: 900px)
      width 350px
    @media (max-width: 750px)
      width 300px
    &.right-side
      left unset
      right 0
    // header
    .sidebar-header
      display flex
      color white
      font-size 1.4rem
      background-color var(--primary)
      height 3rem
      display flex
      align-items center
      padding-left 1.5rem
      padding-right @padding-left
      box-shadow 0 0.3rem 0.8rem 0 rgba(0, 0, 0, 0.25)
      position relative
      &:hover
        cursor pointer
      &.close-btn--hidden
        padding-left 1rem
        padding-right @padding-left
      &.close-btn--left
        padding-left 3rem
        padding-right 1rem
      &.align-title--center
        justify-content center
      &.align-title--right
        justify-content flex-end
      // .sidebar-header-title
      .close-btn
        position absolute
        right 0.5rem
        width 35px
        height @width
        display flex
        justify-content center
        align-items center
        border-radius 2rem
        transition 0.2s
        &:hover
          background-color rgba(black, 0.15)
    .scroll-area
      padding-bottom 5rem
      height calc(100%)
</style>
