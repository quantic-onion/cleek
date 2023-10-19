<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { packageConfig } from '../../../package-config';

import type { Ref } from 'vue';
// components
import CkIcon from '../../ck-icon.vue';
// types
import type { CleekOptions } from '../../../types/cleek-options';
// hooks
import hooks from '../../../utils/global-hooks';

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const isActive = ref(true);

const title = ref('');
const text = ref('');
const color = ref('');
const duration = ref(0);
const closeCallback = ref(() => {});

defineExpose({
  title,
  text,
  color,
  duration,
  closeCallback,
});

const defaultTitle = computed(() => {
  const lang = packageConfig.lang;
  switch (color.value) {
    case 'success':
      if (lang === 'es') return 'Éxito';
      return 'Success';
    case 'danger':
      if (lang === 'es') return 'Error';
      return 'Error';
    case 'warning':
      if (lang === 'es') return 'Atención';
      return 'Alert';
  }
  return '';
});

const computedClass = computed(() => {
  const list = [];
  // group
  if (color.value && hooks.isColorTemplateVariable(color.value)) {
    list.push(`ck-component__bg-color--${color.value}`);
  }
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // group
  if (color.value && !hooks.isColorTemplateVariable(color.value)) {
    list.push({ 'background-color': color.value });
  }
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
  setTimeout(() => {
    setTimeout(() => {
      closeCallback.value();
    }, duration.value);
  }, 10);
});
</script>

<template lang="pug">
Teleport(to='body', v-if='isActive')
  .ck-notify__container
    .ck-notify(:class='computedClass', :style='computedStyle', @click='isActive = false; closeCallback()')
      .ck-notify__title
        .close-btn
          ck-icon(icon='times')
        | {{ title || defaultTitle }}
      .ck-notify__text(v-html='text')
</template>

<style lang="stylus" scoped>
@import 'undefined'
$text-color = white

.ck-notify__container
  position fixed
  right 0
  bottom 0
  padding-right 1rem
  padding-bottom 1rem
  z-index 999999
  display flex
  align-items flex-end
  .ck-notify
    font-family 'Nunito', sans-serif
    color $text-color
    padding 0.5rem
    padding-left 1rem
    border-radius 0.5rem
    min-width 10rem
    background-color #aaa
    cursor pointer
    &.ck-notify--success
      background-color #66CC00
    &.ck-notify--danger
      background-color #FF3333
    &.ck-notify--warning
      background-color #FFDD33
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
        border-radius 0.25rem
        width 25px
        height @width
        cursor pointer
        transition 0.3s
        &:hover
          background-color rgba(black, 0.1)
    .ck-notify__text
      font-size 1rem
      padding 0.15rem
</style>
