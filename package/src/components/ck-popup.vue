<script setup lang="ts">
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// components
import CkButton from './ck-button.vue';
import CkIcon from './ck-icon.vue';
// types
import type { Align, Color, Layout, ButtonType } from '../cleek-options/cleek-options.types';
// utils
import hooks from '@/utils/global-hooks';
import { setBodyOverflow } from '@/utils/css-helpers';

const isActive = defineModel<boolean>({ required: true });

const props = defineProps<{
  title?: string;
  confirmButtons?: boolean;
  acceptButton?: boolean;
  acceptBtnText?: string;
  acceptBtnType?: ButtonType;
  cancelButton?: boolean;
  cancelBtnText?: string;
  cancelBtnType?: ButtonType;
  notCloseBtn?: boolean;
  notCloseByBg?: boolean;
  notClose?: boolean;
  preventCloseOnCancel?: boolean;
  isLoading?: boolean;
  // styles
  width?: number;
  maxWidth?: number;
  layout?: Layout;
  textColor?: Color;
  headerColor?: Color;
  headerAlign?: Align;
  backgroundColor?: Color;
  fontSize?: string;
}>();

const emit = defineEmits<{
  accept: [];
  cancel: [];
}>();

const { cleekOptions } = storeToRefs(useCleekOptionsStore());

const computedClassContent = computed(() => {
  const list = [];
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(layout);
  // text-color
  const textColor = props.textColor || cleekOptions.value.popup.textColor;
  if (textColor && hooks.isColorTemplateVariable(textColor)) {
    list.push(`ck-component__color--${textColor}`);
  }
  return list;
});
const computedStyleContent = computed(() => {
  const list = [];
  // font-size
  const fontSize = props.fontSize || cleekOptions.value.popup.fontSize;
  if (fontSize) list.push({ 'font-size': fontSize });
  // width
  if (props.width) list.push({ width: props.width });
  // max-width
  const maxWidth = props.width ? '95%' : props.maxWidth || cleekOptions.value.popup.maxWidth;
  if (maxWidth) list.push({ 'max-width': maxWidth });
  // text-color
  const textColor = props.textColor || cleekOptions.value.popup.textColor;
  if (textColor && !hooks.isColorTemplateVariable(textColor)) {
    list.push(`ck-component__color--${textColor}`);
    list.push({ color: textColor });
  }
  // background-color
  let backgroundColor = 'white';
  if (cleekOptions.value.popup.backgroundColor) backgroundColor = cleekOptions.value.popup.backgroundColor;
  if (cleekOptions.value.darkMode) backgroundColor = cleekOptions.value.darkModeColorItems;
  if (props.backgroundColor) backgroundColor = props.backgroundColor;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  return list;
});
const computedStyleHeader = computed(() => {
  const list = [];
  // header-color
  let headerColor = '';
  if (cleekOptions.value.popup.headerColor) headerColor = cleekOptions.value.popup.headerColor;
  if (cleekOptions.value.darkMode) headerColor = cleekOptions.value.darkModeColorItems;
  if (props.headerColor) headerColor = props.headerColor;
  if (headerColor && !hooks.isColorTemplateVariable(headerColor)) {
    list.push({ backgroundColor: headerColor });
  }
  // text-color
  let textColor = props.textColor || cleekOptions.value.popup.textColor;
  if (cleekOptions.value.darkMode) textColor = cleekOptions.value.darkModeColorText;
  if (textColor && !hooks.isColorTemplateVariable(textColor)) {
    list.push(`ck-component__color--${textColor}`);
    list.push({ color: textColor });
  }
  return list;
});
const computedStyleBody = computed(() => {
  const list = [];
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value.popup.backgroundColor) backgroundColor = cleekOptions.value.popup.backgroundColor;
  if (cleekOptions.value.darkMode) backgroundColor = cleekOptions.value.darkModeColorItems;
  if (props.backgroundColor) backgroundColor = props.backgroundColor;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  return list;
});
const computedClassHeader = computed(() => {
  const list = [];
  // header-align
  const headerAlign = props.headerAlign || cleekOptions.value.popup.headerAlign;
  if (headerAlign) list.push(`header-align--${headerAlign}`);
  // header-color
  const headerColor = props.headerColor || cleekOptions.value.popup.headerColor;
  if (headerColor && hooks.isColorTemplateVariable(headerColor)) {
    list.push(`ck-component__bg-color--${headerColor}`);
  }
  // close-btn-hidden
  if (!isCloseBtnVisible.value) list.push('close-btn-hidden');
  return list;
});
const realAcceptBtnType = computed(() => {
  if (props.acceptBtnType) return props.acceptBtnType;
  if (cleekOptions.value.popup.acceptBtnType) return cleekOptions.value.popup.acceptBtnType;
  return 'outlined';
});
const realCancelBtnType = computed(() => {
  if (props.cancelBtnType) return props.cancelBtnType;
  if (cleekOptions.value.popup.cancelBtnType) return cleekOptions.value.popup.cancelBtnType;
  return 'flat';
});
const isCloseBtnVisible = computed(() => {
  if (props.notCloseBtn) return false;
  if (props.notClose) return false;
  return true;
});
const realAcceptBtnText = computed(() => {
  if (props.acceptBtnText) return props.acceptBtnText;
  if (cleekOptions.value.lang === 'es') return 'Aceptar';
  return 'Accept';
});
const realCancelBtnText = computed(() => {
  if (props.cancelBtnText) return props.cancelBtnText;
  if (cleekOptions.value.lang === 'es') return 'Cancelar';
  return 'Cancel';
});

watch(isActive, (val) => setBodyOverflow(!val));

function onCancel() {
  emit('cancel');
  if (!props.preventCloseOnCancel) isActive.value = false;
}
function onAccept() {
  emit('accept');
}
function onBgClick() {
  // hacerle un movimiento de rebote como en vuesax
  if (props.notCloseByBg || props.notClose) return;
  isActive.value = false;
}
</script>

<template>
  <teleport v-if="isActive" to="body">
    <div class="ck-popup">
      <div class="blackout" />
      <div class="popup-container" @mousedown="onBgClick()">
        <div class="ck-popup__content" :style="computedStyleContent" :class="computedClassContent" @mousedown.stop="">
          <div class="ck-popup__slot-header" :style="computedStyleHeader" :class="computedClassHeader">
            <!-- title -->
            <h3 v-if="title" class="ck-popup__title">{{ title }}</h3>
            <!-- header slot -->
            <slot name="header" />
            <!-- close btn -->
            <ck-icon v-if="isCloseBtnVisible" class="icon-close" icon="times" @click="isActive = false" />
          </div>
          <div class="ck-popup__slot-body" :style="computedStyleBody">
            <slot />
          </div>
          <div v-if="$slots.footer || confirmButtons || acceptButton || cancelButton" class="ck-popup__slot-footer">
            <div>
              <slot name="footer" />
            </div>
            <div v-if="confirmButtons || acceptButton || cancelButton" class="ck-popup-slot-footer__confirm-buttons">
              <ck-button v-if="confirmButtons || cancelButton" color="danger" :type="realCancelBtnType" @click="onCancel()">
                {{ realCancelBtnText }}
              </ck-button>
              <ck-button
                v-if="confirmButtons || acceptButton"
                :type="realAcceptBtnType"
                :isLoading="isLoading"
                @click="onAccept()"
              >
                {{ realAcceptBtnText }}
              </ck-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="stylus">
.blackout
.popup-container
  background-color $color-overlay
  position fixed
  z-index 9999
  top 0
  left 0
  padding-y 15px
  width 100vw
  height 100vh
.popup-container
  z-index 9999
  flex(row, center, center)
  .ck-popup__content
    display flex
    flex-direction column
    min-width 30vw
    max-width 95vw
    border-radius 0.5rem
    overflow hidden
    @media (min-width: 1150px)
      max-width 80vw
    &.rounded
      border-radius 2rem !important
      .ck-popup__slot-header
        padding-left 2rem
        padding-right 3.5rem
        padding-y 1rem
        .icon-close
          border-radius 3rem
          right 0.75rem
    &.squared
      border-radius 0 !important
    .ck-popup__slot-header
      min-height 3rem
      padding-y 0.6rem
      font-weight 600
      font-size 1.2rem
      background-color #f0f0f0
      padding-left 1.2rem
      padding-right 3rem
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 5px 10px -2px RGBA(0, 0, 0, 0.05)
      position relative
      &.header-align--center
        justify-content center
      &.header-align--right
        justify-content flex-end
      &.close-btn-hidden
        padding-right @padding-left
      .ck-popup__title
        font-size 1.2rem
        margin 0
      .icon-close
        padding 0.5rem 0.75rem
        right 0.5rem
        position absolute
        border-radius 0.25rem
        transition 0.4s
        &:hover
          cursor pointer
          background-color #ddd
    .ck-popup__slot-body
      max-height 70vh
      text-align left
      padding 1.5rem
      padding-bottom 2rem
      overflow-y auto
    .ck-popup__slot-footer
      flex(row, space-between, center, 1rem)
      padding 1rem
      border-top 1px solid #CCC
      width 100%
      box-sizing border-box
      .ck-popup-slot-footer__confirm-buttons
        display inline-flex
        justify-content flex-end
        gap 0.5rem

// fullscreen
@media (max-width: 600px)
  .popup-container
    padding-y 0
    .ck-popup__content
      width 100%
      max-width 100% !important
      border-radius 0
      .ck-popup__slot-body
        padding 1rem
        padding-bottom 1.5rem
@media (max-width: 400px)
  .popup-container
    .ck-popup__content
      .ck-popup__slot-body
        padding 0.5rem
        padding-bottom 1rem
      .ck-popup__slot-footer
        padding-bottom 0.5rem
</style>
