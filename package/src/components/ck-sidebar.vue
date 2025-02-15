<script setup lang="ts">
import { computed, watch } from 'vue';
// types
import type { Color } from '../cleek-options/cleek-options.types';
// utils
import hooks from '@/utils/global-hooks';
import { setBodyOverflow } from '@/utils/css-helpers';

const isActive = defineModel<boolean>({ required: true });

const props = defineProps<{
  title?: string;
  width?: string;
  rightSide?: boolean;
  headerColor?: Color;
  headerAlign?: boolean;
  closeBtnAlign?: 'left' | 'right';
  closeBtnIcon?: string;
  notCloseBtn?: boolean;
  isLoading?: boolean;
}>();

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
const computedCloseBtnIcon = computed(() => {
  if (props.closeBtnIcon) return props.closeBtnIcon;
  return 'times'
})

watch(() => isActive.value, (val) => setBodyOverflow(!val));
</script>

<template>
  <div v-if="isActive" class="ck-sidebar-background" @click.self="isActive = false">
    <div class="ck-sidebar" :class="computedClass" :style="computedStyle">
      <slot name="header"></slot>
      <!-- header -->
      <div
        v-if="title"
        class="sidebar-header"
        :class="computedClassHeader"
        :style="computedStyleHeader"
        @click="isActive = false"
      >
        <div v-if="title" class="sidebar-header-title">
          {{ title }}
        </div>
        <ck-icon class="close-btn" :icon="computedCloseBtnIcon" />
      </div>
      <!-- content -->
      <div class="loader-container" v-if="isLoading">
        <ck-icon icon="spinner" size="xxl" spin color="primary" />
      </div>
      <div v-else class="ck-sidebar__content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="ck-sidbar__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-sidebar-background
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  background-color $color-overlay
  opacity 1
  transition all 0.3s ease
  -webkit-transition all 0.3s ease
  .ck-sidebar
    background-color white
    z-index 10000
    left 0
    height 100vh
    position fixed
    width 450px
    display flex
    flex-direction column
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
      font-size 1.1rem
      background-color var(--primary)
      height 3rem
      display flex
      align-items center
      padding-left 1rem
      padding-right @padding-left
      box-shadow 0 0.3rem 0.8rem 0 rgba(0, 0, 0, 0.1)
      position relative
      flex-shrink 0
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
    .ck-sidebar__content
      overflow-y auto
    .ck-sidbar__footer
      flex-shrink 0
      padding 1rem
      ck-box-shadow(0.15)
      margin-top auto
    .loader-container
      display flex
      justify-content center
      align-items center
      height 100%
    .scroll-area
      padding-bottom 5rem
      height calc(100%)
</style>
