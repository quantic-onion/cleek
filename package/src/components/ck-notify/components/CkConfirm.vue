<script setup lang="ts">
import { computed, ref } from 'vue';
// resources
import { packageConfig } from '../../../resources/package-config';
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

<template>
<div class="ck-confirm--background">
  <div class="ck-confirm">
    <div class="ck-confirm__icon">
      <!-- <ck-img src="cleek/hexagon-exclamation.png" height="7rem"/> -->
      <!-- <img
        class="ck-confirm__icon--img"
        src="https://img.quanticonion.com/icons/hexagon-exclamation.png"
        height="7rem"
      /> -->
      <img src="@/assets/icons/hex-warning.svg" height="125"/>
    </div>
    <div class="ck-confirm__title">
      {{ title || defaultTitle }}
    </div>
    <div class="ck-confirm__message">
      {{ msg }}
    </div>
    <div class="ck-confirm__buttons-container">
      <!-- <ck-button class="mr-2" color="light" type="filled" @click="onCancel()"/> -->
      <button class="ck-confirm__button--cancel" @click="onCancel()">
        {{ cancelText || defaultCancelText }}
      </button>
      <!-- <ck-button type="filled" color="danger" @click="onAccept()"/> -->
      <button class="ck-confirm__button--accept" @click="onAccept()">
        {{ acceptText || defaultAcceptText }}
      </button>
    </div>
  </div>
</div>
</template>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
