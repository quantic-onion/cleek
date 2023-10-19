<script setup lang="ts">
import { computed, ref } from 'vue';
import { packageConfig } from '../../../package-config';
// types
// hooks
import hooks from '../../../utils/global-hooks';

const title = ref('');
const msg = ref('');
const acceptText = ref('');
const cancelText = ref('');

const responseSuccess = ref(() => {});
const responseFailure = ref(() => {});

const defaultTitle = computed(() => {
  if (packageConfig.lang === 'es') return '¿Estás seguro?';
  return '¿Are you sure?';
});
const defaultAcceptText = computed(() => {
  if (packageConfig.lang === 'es') return 'Aceptar';
  return 'Accept';
});
const defaultCancelText = computed(() => {
  if (packageConfig.lang === 'es') return 'Cancelar';
  return 'Cancel';
});

function onCancel() {
  responseFailure.value();
}
function onAccept() {
  responseSuccess.value();
}

defineExpose({
  title,
  msg,
  acceptText,
  cancelText,
  responseSuccess,
  responseFailure,
});
</script>

<template lang="pug">
.ck-confirm--background
  .ck-confirm
    .ck-confirm__icon
      //- ck-img(src="cleek/hexagon-exclamation.png" height="7rem")
      img.ck-confirm__icon--img(src='https://img.quanticonion.com/icons/hexagon-exclamation.png', height='7rem')
    .ck-confirm__title {{ title || defaultTitle }}
    .ck-confirm__message {{ msg }}
    .ck-confirm__buttons-container
      //- ck-button.mr-2(@click="onCancel()" color="light" type="filled")
      button.ck-confirm__button--cancel(@click='onCancel()')
        | {{ cancelText || defaultCancelText }}
      //- ck-button(@click="onAccept()" type="filled" color="danger")
      button.ck-confirm__button--accept(@click='onAccept()')
        | {{ acceptText || defaultAcceptText }}
</template>

<style lang="stylus" scoped>
@import 'undefined'
.ck-confirm--background
  z-index 99999
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background-color rgba(black, 0.5)
  display flex
  justify-content center
  align-items center
.ck-confirm
  text-align center
  color #5C5C5C
  padding 2rem 1rem
  background-color white
  border-radius 0.5rem
  width 450px
  max-width 100%
  font-family 'Nunito', sans-serif
  .ck-confirm__title
    // color #595959
    font-size 1.7rem
    margin-bottom 1rem
    font-weight 600
  .ck-confirm__message
    // color #5C5C5C
    font-size 1rem
    margin-bottom 2rem
  .ck-confirm__buttons-container
    display flex
    justify-content center

// replaces for cleek broken imports
.ck-confirm__icon--img
  width 7rem
  height @width
.ck-confirm__button--cancel
.ck-confirm__button--accept
  border none
  border-radius 0.5rem
  padding 0.85rem 1.5rem
  cursor pointer
  font-size 0.9rem
  font-weight 600
.ck-confirm__button--accept
  background-color #E64942
  color white
  margin-left 0.5rem
  &:hover
    background-color #df4740
.ck-confirm__button--cancel
  background-color #efefef
  color #555
  &:hover
    background-color #e8e8e8
</style>
