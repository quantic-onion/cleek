<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  // triggerType?: string; // hover
  dark?: boolean;
  align?: 'left' | 'center' | 'right';
}>();

// const defaultTriggerType = 'click';

const isOpen = ref(false);
const popperRef = ref(null);

const computedClass = computed(() => {
  const list = [];
  if (props.align) list.push(`align-${props.align}`)
  return list;
})

function openClose() {
  if (isOpen.value) return; // always is closed by event listener
  // check next click, to close
  const closeListerner = (event: Event) => {
    if (popperRef.value != event.target) isOpen.value = false;
    window.removeEventListener('click', closeListerner);
  }
  setTimeout(() => {
    window.addEventListener('click', closeListerner);
  });
  isOpen.value = true;
}
</script>

<template lang="pug">
.ck-dropdown(:class="computedClass")
  //- button
  .ck-dropdown__trigger(
  @click="openClose()"
  )
    slot(name="trigger")
  //- menu
  .ck-dropdown__popper-container
    section.ck-dropdown__popper(
    ref="popperRef"
    v-if="isOpen"
    :class="{ 'ck-dropdown__popper--dark': dark }"
    )
      .ck-dropdown__popper--arrow(
      :class="{ 'ck-dropdown__popper--arrow--dark': dark }"
      )
      slot(name="popper")
</template>

<style lang="stylus" scoped>
.ck-dropdown
  position relative
  .ck-dropdown__trigger
    cursor pointer
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
      box-shadow 10px 10px 0 0 rgba(black,.03)
      background white
      padding .5rem
      animation menu 0.3s ease forwards
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
  // dark
  .ck-dropdown__popper--dark
    background #333
    border none
    color #eee

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
</style>