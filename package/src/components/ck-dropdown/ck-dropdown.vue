<template lang="pug">
section.ck-dropdown
  //- button
  .ck-dropdown__trigger(
  ref="triggerRef"
  @click="openClose()"
  )
    | USUARIO
  //- menu
  section.ck-dropdown__popper(
  ref="popperRef"
  v-if="isOpen"
  :class="{ 'ck-dropdown__popper--dark': dark }"
  )
    .ck-dropdown__popper--arrow(
    :class="{ 'ck-dropdown__popper--arrow--dark': dark }"
    )
    | DESPLEGABLE
    slot
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  triggerType: { type: String, default: 'click' }, // hover
  dark: { type: Boolean, default: false },
});

const isOpen = ref(false);
const triggerRef = ref(null);
const popperRef = ref(null);

function openClose() {
  const closeListerner = (e) => {
    if (catchOutsideClick(e))
      window.removeEventListener('click', closeListerner) , isOpen.value = false
  }
  window.addEventListener('click', closeListerner)
  isOpen.value = !isOpen.value;
}
function catchOutsideClick(event)  {
  // When user clicks trigger or popper — do nothing
  if (triggerRef.value == event.target) return false;
  if (popperRef.value == event.target) return false;
  // When user clicks outside of the popper — close the menu
  if (isOpen.value && triggerRef.value != event.target) return true;
}
</script>

<style lang="stylus" scoped>
.ck-dropdown
  position relative
  .ck-dropdown__trigger
    cursor pointer
  .ck-dropdown__popper
    z-index 1
    position absolute
    top 100%
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
  .ck-dropdown__popper--dark
    background #333
    border none
    color #eee

  @keyframes menu
    from
      transform translate3d(0, 30px, 0)
    to
      transform translate3d(0, 20px, 0)
</style>