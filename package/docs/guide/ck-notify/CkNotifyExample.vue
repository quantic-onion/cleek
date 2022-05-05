<template lang="pug">
ComponentShower(title="Use")
  p
    |Por ahora (hasta poder hacerlo bien) user el componente,
    |
    | hay que agregarlo en el componente #app
    |
    | y crear unas funciones que llamen a las funciones del componente
ComponentShower(title="Types")
  ComponentShowerRow
    ck-notify(ref="refCkNotify")
  ComponentShowerRow
    ck-input(v-model="text" label="Notification text")
  ComponentShowerRow
    ck-button(@click="testNotify()")
      | Test notify
    ck-button(@click="testNotifySuccess()" icon="check" type="filled" color="success")
      | Success
    ck-button(@click="testNotifyDanger()" icon="times" type="filled" color="danger")
      | Danger
    ck-button(@click="testNotifyWarning()" icon="minus" type="filled" color="warning")
      | Warning
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import ComponentShowerRow from '../../layout/componentsShower/ComponentShowerRow.vue';
import { ckNotify, ckButton, ckInput } from '../../../src/components/index';

const refCkNotify = ref(null);
const text = ref('Holis');

function testNotify() {
  refCkNotify.value.ckNotify({ text: text.value });
}
function testNotifySuccess() {
  refCkNotify.value.ckNotifySuccess(text.value);
}
function testNotifyDanger() {
  refCkNotify.value.ckNotifyError (text.value);
}
function testNotifyWarning() {
  refCkNotify.value.ckNotifyWarning(text.value);
}
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
