<template lang="pug">
Teleport(to="body" v-if="isActive")
  .ck-notify__container
    .ck-notify(
    :style="{ 'background-color': globalColor }"
    @click="closeNotification()"
    )
      .ck-notify__title
        .close-btn
          ck-icon(icon="times")
        | {{ globalTitle }}
      .ck-notify__text {{ globalText }}
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import functions from '../../utils/functions';
import CkIcon from '../ck-icon.vue';

defineExpose({
  CkNotify,
  ckNotifySuccess,
  ckNotifyError ,
  ckNotifyWarning,
});

const isActive = ref(false);

const globalTitle = ref('');
const globalText = ref('');
const globalColor = ref('');
const defaultDuration = ref(2000);

function closeNotification() {
  isActive.value = false;
}

function CkNotify({ text = '', title = '', color = '#ccc', duration = defaultDuration.value }) {
  // set info
  globalTitle.value = title;
  globalText.value = text;
  globalColor.value = color;
  // open
  isActive.value = true;
  // set close
  setTimeout(() => {
    closeNotification();
  }, duration);
}

function ckNotifySuccess(text: string = '', title: string = 'Éxito') {
  // const $cleekOptions = functions.getCleekOptions(getCurrentInstance);
  CkNotify({
    text,
    title,
    color: '#66CC00',
    // color: $cleekOptions.color.success,
  });
}
function ckNotifyError (text: string = '', title: string = 'Error') {
  CkNotify({ text, title, color: '#FF3333'});
}
function ckNotifyWarning(text: string = '', title: string = 'Atención') {
  CkNotify({ text, title, color: '#FFDD33'});
}
</script>

<style lang="stylus" scoped>
$text-color = white

.ck-notify__container
  position absolute
  right 0
  bottom 0
  padding-right 1rem
  padding-bottom 1rem
  z-index 999999
  .ck-notify
    color $text-color
    padding .5rem
    padding-left 1rem
    border-radius .5rem
    min-width 10rem
    .ck-notify__title
      font-size 1.25rem
      font-weight 600
      display flex
      align-items center
      justify-content space-between
      flex-direction row-reverse
      .close-btn
        color $text-color
        font-size 1rem
        display inline-flex
        align-items center
        justify-content center
        border-radius .25rem
        width 25px
        height @width
        cursor pointer
        transition .3s
        &:hover
          background-color rgba(black, .1)
    .ck-notify__text
      font-size 1rem
      padding .15rem
</style>