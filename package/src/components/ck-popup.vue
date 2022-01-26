<template lang="pug">
.ck-popup(v-if="value")
  .blackout
  .popup-container(@click="onBgClick()")
    .ck-popup__content(@click.stop="")
      .ck-popup__slot-header
        //- title
        h3.ck-popup__title(v-if="title")
          | {{ title }}
        //- header slot
        slot.ml-3(name="header")
        //- close btn
        ck-icon.mr-3.close(
        icon="times"
        v-if="!notCloseBtn"
        @click="value = false"
        )
      //- VuePerfectScrollbar.ck-popup__slot-body
      .ck-popup__slot-body
        slot
      .ck-popup__slot-footer(v-if="$slots.footer || confirmButtons")
        slot(name="footer")
        .ck-popup-slot-footer__confirm-buttons(v-if="confirmButtons")
          ck-button.cancel-button(@click="onCancel()" color="danger")
            | Cancelar
          ck-button(@click="onAccept()")
            | Aceptar
</template>

<script setup lang="ts">
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import ckButton from './ck-button.vue';
import ckIcon from './ck-icon.vue';
</script>

<script lang="ts">
export default {
  props: {
    modelValue: { type: Boolean },
    title: { type: String, default: undefined },
    confirmButtons: { type: Boolean, default: false },
    notCloseBtn: { type: Boolean, default: false },
    notCloseByBg: { type: Boolean, default: false },
    preventCloseOnCancel: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'cancel', 'accept'],
  // data() {
  //   return {
  //     perfectScrollbarSettings: { // perfectscrollbar settings
  //       maxScrollbarLength: 60,
  //       wheelSpeed: 0.60,
  //     },
  //   }; // return data
  // }, // data
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) { this.$emit('update:modelValue', val); },
    },
  }, // computed
  methods: {
    // onCancel
    // onAccept

    onCancel() {
      this.$emit('cancel');
      if (!this.preventCloseOnCancel) this.value = false;
    },
    onAccept() {
      this.$emit('accept');
    },
    onBgClick() {
      // hacerle un movimiento de rebote como en vuesax
      if (this.notCloseByBg) return;
      this.value = false;
    },
  }, // methods
}; // export default
</script>

<style lang="stylus">
@require '../styles/ck-styles'

.blackout, .popup-container
  background-color RGBA(0, 0, 0, 0.2)
  position fixed
  z-index 9999
  top 0
  left 0
  padding-y 15px
  width 100vw
  height 100vh
.popup-container
  background-color none
  z-index 99999
  display flex
  justify-content center
  .ck-popup__content
    background-color white
    min-width 30vw
    width 500px
    max-width 95vw
    @media(min-width 1150px)
      max-width 65rem
    margin auto
    border-radius 10px
    padding-bottom 15px
    .ck-popup__slot-header
      font-weight 600
      font-size 1.2rem
      background-color #f0f0f0
      padding-x 1rem
      min-height 50px
      font-size 17px
      display flex
      justify-content space-between
      align-items center
      border-radius 10px 10px 0 0
      box-shadow 0 5px 10px -2px RGBA(0, 0, 0, 0.15)
      position relative
      .ck-popup__title
        margin 0
      .close
        padding .5rem .75rem
        right .5rem
        position absolute
        border-radius .25rem
        transition .4s
        &:hover
          cursor pointer
          background-color #ddd
    .ck-popup__slot-body
      overflow-y scroll
      max-height 75vh
      text-align left
      padding-x 1rem
      padding-y 2rem
      overflow-y auto
    .ck-popup__slot-footer
      margin-top 1rem
      padding-top 1rem
      border-top 1px solid #CCC
      padding-x 1rem
      width 100%
      .ck-popup-slot-footer__confirm-buttons
        display flex
        justify-content flex-end
        .cancel-button
          margin-right .5rem

// fullscreen
@media(max-width 600px)
  .popup-container
    padding-y 0
    .ck-popup__content
      width 100%
      max-width 100%
      min-height 100vh
      border-radius 0
    .ck-popup__slot-body
      padding-bottom 4rem
      padding-top 1rem
</style>
