<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
// types
import type { Align, CleekOptions, Layout } from '../../types/cleek-options';
// utils
import hooks from '@/utils/global-hooks';

const props = defineProps<{
  align?: Align;
  dark?: boolean;
  layout?: Layout;
}>();

const cleekOptions = ref<CleekOptions>();
const isOpen = ref(false);
const contentRef = ref<HTMLElement>();
const contentMarginLeft = ref('0');

const computedClassContent = computed(() => {
  const list = [];
  // align
  if (props.align) list.push(`ck-dropdown--content__${props.align}`);
  // dark
  if (props.dark) list.push('ck-dropdown--content__dark');
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(`ck-dropdown--content__${layout}`);
  return list;
});

watch(contentRef, (val) => {
  if (val) contentMarginLeft.value = -val.getBoundingClientRect().width / 2 + 'px';
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <div class="ck-dropdown">
    <!-- trigger -->
    <div class="ck-dropdown--trigger" @click="isOpen = true">
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
    position absolute
    top 100%
    left 50%
    z-index 1000
    margin-top 1rem
    margin-left v-bind('contentMarginLeft')
    padding 0.5rem
    border 1px solid #eee
    border-radius 0.4rem
    color black
    background white
    // align
    &__left
      left 0
      right auto
      margin-left 0
    &__right
      left auto
      right 0
      margin-left 0
    // dark
    &__dark
      color #eee
      background #333
      border none
    // layout
    &__squared
      border-radius 0
    &__rounded
      border-radius 100%
</style>
