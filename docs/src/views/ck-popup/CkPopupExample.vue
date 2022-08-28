<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits'

const isActivePopup = ref(false);
const isActivePopupWithTitle = ref(false);
const isActiveConfirm = ref(false);
const isActiveAcceptBtn = ref(false);
const isActivePopupNotCloseBtn = ref(false);
const isActivePopupNotCloseByBg = ref(false);
const isActivePopupNotCloseAtAll = ref(false);
const isActivePopupCustomHeader = ref(false);
const isActivePopupFooter = ref(false);

// TODO, next props needs explanation
// acceptButton?: boolean;
// cancelButton?: boolean;
// acceptBtnText?: string;
// acceptBtnType?: ButtonType;
// cancelBtnText?: string;
// cancelBtnType?: ButtonType;

// width?: number;
// maxWidth?: number;
// layout?: Layout;
// textColor?: Color;
// headerColor?: Color;
// headerAlign?: Align;
// fontSize?: string;
</script>

<template lang="pug">
ComponentShower
  ComponentShowerRow(title="Default")
    ck-button(@click="isActivePopup = true")
      | Popup
    ck-button(@click="isActivePopupWithTitle = true")
      | Popup with title
  ComponentShowerRow(title="Confirm buttons")
    ck-button(@click="isActiveConfirm = true")
      | Confirm
    ck-button(@click="isActiveAcceptBtn = true")
      | Accept btn
  ComponentShowerRow(title="Not close")
    ck-button(@click="isActivePopupNotCloseBtn = true")
      | Not close btn
    ck-button(@click="isActivePopupNotCloseByBg = true")
      | Not close by bg
    ck-button(@click="isActivePopupNotCloseAtAll = true")
      | Not close at all
  ComponentShowerRow(title="Header and footer slots")
    ck-button(@click="isActivePopupCustomHeader = true")
      | Header slot
    ck-button(@click="isActivePopupFooter = true")
      | Footer slot

//- popups
ck-popup(v-model="isActivePopup")
  | Common popup
ck-popup(v-model="isActivePopupWithTitle" title="This is a title")
  | Common popup
//- confirm
ck-popup(confirmButtons v-model="isActiveConfirm" title="Confirm buttons")
  | Popup with two buttons that emits: "@accept" y "@cancel"
  div @cancel close popup by default, except the prop "preventCloseOnCancel" is true
//- accept btn
ck-popup(acceptButton v-model="isActiveAcceptBtn" title="Accept button")
  | Popup with accept button that emits: "@accept"
//- not close btn
ck-popup(notCloseBtn v-model="isActivePopupNotCloseBtn" title="Not close button")
  .text-center.mb-2 Oculta el botón de cerrar
  .help-text Close by clicking background or programmatically
//- not close on bgClick
ck-popup(notCloseByBg v-model="isActivePopupNotCloseByBg" title="Not close by background")
  | Not close by clicking in the background
//- not close at all
ck-popup(v-model="isActivePopupNotCloseAtAll" notClose title="Not close at all")
  div.mb-2 You just can close the popup programmatically
  ck-button(@click="isActivePopupNotCloseAtAll = false")
    | Click me to close
//- header slot
ck-popup(v-model="isActivePopupCustomHeader" notCloseBtn)
  template(v-slot:header)
    .happy-birthday
      ck-icon.pr-4(icon="cake-candles")
      | Happy birthday
      ck-icon.pl-4(icon="gifts")
  .text-center This is a custom header
//- footer slot
ck-popup(v-model="isActivePopupFooter" title="Custom footer")
  table
    tr
      th.p-2.text-right Price
      th.p-2 Product
    tr
      td.p-2.text-right $50.00
      td.p-2 T-shirt
    tr
      td.p-2.text-right $100.00
      td.p-2 Trousers
    tr
      td.p-2.text-right $20.00
      td.p-2 Socks
  template(v-slot:footer)
    h3.total-price TOTAL $170.00

PropsAndEmitsShower(
:propsList="propsAndEmits.popup.props"
:emitsList="propsAndEmits.popup.emits"
)
</template>

<style lang="stylus" scoped>
.happy-birthday
  font-size 1.5rem
  font-weight 600
  background-image linear-gradient(to right top, #d43cad, #cc33b6, #c22bbf, #b427ca, #a326d5, #834de9, #5a65f7, #0078ff, #0097ff, #00adf2, #00bdd4, #00c9b7)
  color white
  padding 1rem 2rem
  width 100%
  text-align center
  border-radius 5rem
.total-price
  color red
  background-color rgba(red, .15)
  border-radius .5rem
  padding 1rem
  text-align right
</style>