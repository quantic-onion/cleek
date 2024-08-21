<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
// types
import type { Align, CleekOptions, Layout } from '../../types/cleek-options';
// utils
import hooks from '@/utils/global-hooks';
import { lockScroll, unlockScroll } from '@/utils/lock-scroll';

const props = withDefaults(
  defineProps<{
    dark?: boolean;
    align?: Align;
    layout?: Layout;
  }>(),
  {
    align: 'center',
  },
);

const cleekOptions = ref<CleekOptions>();
const isOpen = ref(false);
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const contentMarginLeft = ref('0');

const computedClassContent = computed(() => {
  const list = [];
  // dark
  if (props.dark) list.push('ck-dropdown--content__dark');
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(`ck-dropdown--content__${layout}`);
  return list;
});

watch(contentRef, (val) => {
  if (val && props.align === 'center') {
    const triggerWidth = triggerRef.value.getBoundingClientRect().width;
    const contentWidth = contentRef.value.getBoundingClientRect().width;
    contentMarginLeft.value = (triggerWidth - contentWidth) / 2 + 'px';
  }
});
watch(isOpen, (val) => {
  if (val) lockScroll();
  else unlockScroll();
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <div class="ck-dropdown" :class="[`ck-dropdown__${align}`]">
    <!-- trigger -->
    <div ref="triggerRef" class="ck-dropdown--trigger" @click="isOpen = true">
      <slot name="trigger" />
    </div>
    <!-- content -->
    <div
      ref="contentRef"
      class="ck-dropdown--content"
      v-if="isOpen"
      :class="computedClassContent"
      v-click-outside="() => (isOpen = false)"
    >
      <div class="ck-dropdown--arrow" :class="{ 'ck-dropdown--arrow__dark': dark }" />
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-dropdown
  position relative
  .ck-dropdown--trigger
    user-select none
    cursor pointer
  .ck-dropdown--content
    arrow-size = 1rem
    position absolute
    top 100%
    left 0
    z-index 1000
    min-height 1rem
    min-width 1rem
    margin-top arrow-size * 2
    margin-left v-bind('contentMarginLeft')
    padding 0.5rem
    border 1px solid #eee
    border-radius 0.4rem
    color black
    background white
    &__dark
      color #eee
      background #333
      border none
    &__rounded
      border-radius 100%
    &__squared
      border-radius 0
    .ck-dropdown--arrow
      position absolute
      top 0
      left 50%
      height arrow-size
      width arrow-size
      margin-top -(arrow-size / 2)
      margin-left -(arrow-size / 2)
      border-left 1px solid #eee
      border-top @border-left
      background white
      transform rotate(45deg)
      border-radius 0.2rem 0 0 0
      &__dark
        background #333
        border none
</style>
