<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { CSSProperties } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// types
import type { Align, Layout } from '../../cleek-options/cleek-options.types';

const props = defineProps<{
  align?: Align;
  dark?: boolean;
  layout?: Layout;
}>();

defineExpose({
  close,
});

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const dropdownContentStyle = ref<CSSProperties>();

const computedClassContent = computed(() => {
  const list = [];
  // dark
  if (props.dark) list.push('ck-dropdown--content__dark');
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(`ck-dropdown--content__${layout}`);
  return list;
});

watch(() => isOpen.value, (val) => {
  if (val) {
    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;
    const dropdownRect = dropdownRef.value.getBoundingClientRect();
    const styles: CSSProperties = {};
    // open
    const openBelow = dropdownRect.top < clientHeight / 2;
    if (openBelow) {
      styles['top'] = `${dropdownRect.bottom}px`;
      styles['margin-top'] = '0.5rem';
    } else {
      styles['bottom'] = `${clientHeight - dropdownRect.top}px`;
      styles['margin-bottom'] = '0.5rem';
    }
    // align (left - right)
    if (props.align === 'left') {
      styles['left'] = `${dropdownRect.left}px`;
    } else if (props.align === 'right') {
      styles['right'] = `${clientWidth - dropdownRect.right}px`;
    }
    dropdownContentStyle.value = styles;
  }
});
watch(() => contentRef.value, (val) => {
  if (val) {
    if (props.align !== 'left' && props.align !== 'right') {
      // align (center)
      const dropdownRect = dropdownRef.value.getBoundingClientRect();
      dropdownContentStyle.value.left = `${dropdownRect.left + dropdownRect.width / 2 - val.getBoundingClientRect().width / 2}px`;
    }
  }
});

function close() {
  isOpen.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', () => (isOpen.value = false));
});
</script>

<template>
  <div ref="dropdownRef" class="ck-dropdown">
    <!-- trigger -->
    <div class="ck-dropdown--trigger" @click="isOpen = true">
      <slot name="trigger" />
    </div>
    <!-- content -->
    <teleport to="body">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="ck-dropdown--content"
        :class="computedClassContent"
        :style="dropdownContentStyle"
        v-click-outside="() => (isOpen = false)"
      >
        <slot name="content" />
      </div>
    </teleport>
  </div>
</template>

<style lang="stylus" scoped>
.ck-dropdown
  position relative
  .ck-dropdown--trigger
    user-select none
    cursor pointer
</style>

<style lang="stylus">
.ck-dropdown--content
  position fixed
  z-index 1000
  padding 0.4rem
  border 1px solid #eee
  border-radius 0.4rem
  overflow hidden
  color black
  background white
  // dark
  &__dark
    color #eee
    background #333
    border none
  // layout
  &__squared
    border-radius 0
  &__rounded
    border-radius 1.75rem
</style>
