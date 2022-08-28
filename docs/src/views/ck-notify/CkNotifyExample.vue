<script setup lang="ts">
import { ref } from 'vue';
import { ckNotify } from 'cleek';
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';

const text = ref('Helloooo');

function testConfirm() {
  ckNotify.confirm('You are going to kill your mum', () => {
    ckNotify.notifyError('Ohh, you killed her :O');
  }, () => {
    ckNotify.notifySuccess('Thanks god, you saved her');
  });
}
function testAlert() {
  ckNotify.alert('¡You opened it!');
}
function testNotify() {
  ckNotify.notify({ text: text.value });
}
function testNotifySuccess() {
  ckNotify.notifySuccess(text.value);
}
function testNotifyDanger() {
  ckNotify.notifyError (text.value);
}
function testNotifyWarning() {
  ckNotify.notifyWarning(text.value);
}
function testNotifyHTML() {
  ckNotify.notifyError('html <b>HIGHLIGHTED</b> text');
}
</script>

<template lang="pug">
ComponentShower(title="Use")
  p
    |Por ahora (hasta poder hacerlo bien) user el componente,
    |
    | hay que agregarlo en el componente #app
    |
    | y crear unas funciones que llamen a las funciones del componente
ComponentShower(title="Notify")
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
    ck-button(@click="testNotifyHTML()")
      | Notify HTML
ComponentShower(title="Confirm")
  ck-button(@click="testConfirm()" icon="circle-check" type="filled")
    | Warning
ComponentShower(title="Alert")
  ck-button(@click="testAlert()" icon="triangle-exclamation" type="filled")
    | Alert
</template>