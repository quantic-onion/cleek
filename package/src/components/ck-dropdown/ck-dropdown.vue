<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
// types
import type { Align, CleekOptions, Layout } from '../../types/cleek-options';
// hooks
import hooks from '../../utils/global-hooks';

const props = defineProps<{
  // triggerType?: string; // hover
  dark?: boolean;
  align?: Align;
  layout?: Layout;
}>();

// const defaultTriggerType = 'click';
const cleekOptions = ref<CleekOptions>();
const isOpen = ref(false);
const popperRef = ref(null);

const computedClass = computed(() => {
  const list = [];
  if (props.align) list.push(`align-${props.align}`);
  return list;
});
const computedClassPopper = computed(() => {
  const list = [];
  // dark
  if (props.dark) list.push('ck-dropdown__popper--dark');
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(`layout--${layout}`);
  return list;
});

function handleTriggerClick() {
  if (isOpen.value) return; // always is closed by event listener
  // check next click, to close
  const closeListerner = (event: Event) => {
    if (popperRef.value != event.target) isOpen.value = false;
    window.removeEventListener('click', closeListerner);
  };
  setTimeout(() => {
    window.addEventListener('click', closeListerner);
  });
  isOpen.value = true;
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <div class="ck-dropdown" :class="computedClass">
    <!-- button -->
    <div class="ck-dropdown__trigger" @click="handleTriggerClick()">
      <slot name="trigger" />
    </div>
    <!-- menu -->
    <div class="ck-dropdown__popper-container">
      <section v-if="isOpen" ref="popperRef" class="ck-dropdown__popper" :class="computedClassPopper">
        <div class="ck-dropdown__popper--arrow" :class="{ 'ck-dropdown__popper--arrow--dark': dark }" />
        <slot name="popper" />
      </section>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-dropdown
  position relative
  .ck-dropdown__trigger
    cursor pointer
    height 100%
  .ck-dropdown__popper-container
    width 100%
    z-index 999
    position absolute
    top 100%
    position relative
    background-color red
    .ck-dropdown__popper
      position absolute
      z-index 1
      min-width 10px
      min-height 10px
      border-radius 8px
      border 1px solid #eee
      box-shadow 10px 10px 0 0 rgba(black, 0.03)
      background white
      padding 0.5rem
      animation menu 0.3s ease forwards
      &.layout--rounded
        border-radius 1.75rem
      &.layout--squared
        border-radius 0
      // dark
      &.ck-dropdown__popper--dark
        background #333
        border none
        color #eee
    .ck-dropdown__popper--arrow
      width 20px
      height 20px
      position absolute
      top -10px
      left 20px
      border-left 1px solid #eee
      border-top 1px solid #eee
      background white
      transform rotate(45deg)
      border-radius 4px 0 0 0
      &.ck-dropdown__popper--arrow--dark
        background #333
        border none

  @keyframes menu
    from
      transform translate3d(0, 30px, 0)
    to
      transform translate3d(0, 20px, 0)
  &.align-right
    .ck-dropdown__popper-container
      top 0
      .ck-dropdown__popper
        right 0
        .ck-dropdown__popper--arrow
          left unset
          right 20px
  &.align-center
    .ck-dropdown__popper-container
      top 0
      .ck-dropdown__popper
        left 0
        right 0
        margin-left auto
        margin-right auto
        display flex
        justify-content center
        .ck-dropdown__popper--arrow
          left 0
          right 0
          margin-left auto
          margin-right auto
</style>
