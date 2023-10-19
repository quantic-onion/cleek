<script setup lang="ts">
import { computed, ref } from 'vue';
// components
import CkPopup from '../../ck-popup.vue';
// hooks
import { packageConfig } from '../../../package-config';

const title = ref('');
const msg = ref('');
const acceptText = ref('');

const isActive = ref(true);

const defaultTitle = computed(() => {
  if (packageConfig.lang === 'es') return 'Atención';
  return 'Attention';
});
const defaultAcceptText = computed(() => {
  if (packageConfig.lang === 'es') return 'Aceptar';
  return 'Accept';
});

defineExpose({
  title,
  msg,
  acceptText,
});
</script>

<template lang="pug">
teleport(to='body')
  ck-popup(
    v-model='isActive',
    acceptButton,
    notCloseBtn,
    headerColor='primary',
    headerAlign='center',
    acceptBtnType='filled',
    :title='title || defaultTitle',
    :acceptBtnText='acceptText || defaultAcceptText',
    @accept='isActive = false'
  )
    .alert--msg {{ msg }}
</template>

<style lang="stylus" scoped>
.alert--msg
  font-size 1.25rem
  text-align center
</style>
