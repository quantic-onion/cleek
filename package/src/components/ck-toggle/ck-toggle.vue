<script setup lang="ts">
import { computed } from 'vue';
// types
import { Color, Icon, Layout } from '@/cleek-options/cleek-options.types';

const props = defineProps<{
  modelValue: boolean;
  color?: Color;
  layout?: Layout;
  icon?: Icon;
  iconRight?: Icon;
  preventAutoUpdate?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const isActive = computed({
  get() { return props.modelValue; },
  set(val) {
    if (props.preventAutoUpdate) return;
    emit('update:modelValue', val);
  },
});
</script>


<template>
  <div
    class="ck-toggle"
    :class="{ 'is-active': isActive }"
    @click="isActive = !isActive"
  >
    <ck-icon v-if="icon" :icon="icon" />
    <slot />
    <ck-icon v-if="iconRight" :icon="iconRight" />
  </div>
</template>

<style lang="stylus" scoped>
.ck-toggle
  background-color white
  border 1px solid #F2F3F5
  border-radius 10rem
  padding 0.25rem 0.5rem
  display inline-flex
  align-items center
  gap 0.25rem
  color #828B96
  cursor pointer
  font-size 0.8rem
  height 2rem
  position relative
  ck-box-shadow()
  &:hover
    background-color #F7F8F9
    .ck-toggle__close-icon
      opacity 1
  &.is-active
    color var(--primary)
    background-color dynamic-rgba(--primary-rgb, .15)
    border-color dynamic-rgba(--primary-rgb, .5)
  &.is-active:hover
    background-color dynamic-rgba(--primary-rgb, .2)
  .ck-toggle__icon
    padding-left 0.1rem
  // .ck-toggle__close-icon
  //   opacity 0
  //   transition 0.3s
  //   position absolute
  //   right 0
  //   height 100%
  //   display flex
  //   align-items center
  //   justify-content center
  //   background-color #eee
  //   width 2rem
  //   border-radius 10rem
  //   color dynamic-rgba(--primary-rgb, .5)
  //   &:hover
  //     background-color dynamic-rgba(--primary-rgb, .75)
  //   &::after
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     background-color dynamic-rgba(--primary-rgb, .3)
  //     border-radius 10rem
</style>