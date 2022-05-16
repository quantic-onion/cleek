<template lang="pug">
ck-button.mr-2(@click="isActivePopup = true")
  | Popup
ck-button.mr-2(@click="isActiveConfirm = true")
  | Confirm
ck-button.mr-2(@click="isActivePopupNotCloseBtn = true")
  | Not close btn
ck-button.mr-2(@click="isActivePopupNotCloseByBg = true")
  | Not close by bg

//- popup
ck-popup(v-model="isActivePopup" title="Popup Normal")
  div
    | Este es un popup normal que solo contiene información
  template(v-slot:footer) pie de popup

//- confirm
ck-popup(confirmButtons v-model="isActiveConfirm")
  template(v-slot:header) Popup tipo Confirm
  div
    | Popup con dos opciones, que emite: "@accept" y "@cancel"

//- not close btn
ck-popup(notCloseBtn v-model="isActivePopupNotCloseBtn")
  template(v-slot:header) Not close button
  div
    | Oculta el botón de cerrar

//- not close on bgClick
ck-popup(notCloseByBg v-model="isActivePopupNotCloseByBg")
  template(v-slot:header) Not close by background
  div
    | Si hacés click afuera no se cierra

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CkButton, CkPopup } from '../../../src/components/index';

const isActivePopup = ref(false)
const isActiveConfirm = ref(false)
const isActivePopupNotCloseBtn = ref(false)
const isActivePopupNotCloseByBg = ref(false)
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
