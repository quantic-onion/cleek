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

<script>
import { ckButton, ckPopup } from '../../../src/components/index';

export default {
  name: 'CkPopupExample',
  components: {
    ckButton,
    ckPopup,
  },
  data() {
    return {
      isActivePopup: false,
      isActiveConfirm: false,
      isActivePopupNotCloseBtn: false,
      isActivePopupNotCloseByBg: false,
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../src/styles/tailwind-fake'
</style>
