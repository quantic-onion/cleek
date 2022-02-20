<template lang="pug">
ComponentShower(title="Default")
  ck-input

ComponentShower(title="Icon" noGap)
  ck-input(group="left" label="Icon" icon="helicopter")
  ck-input(group="center" label="Icon placeholder" icon="user" placeholder="Buscar...")
  ck-input(group="right" label="Icon text" icon="search")

ComponentShower(title="Label / placeholder" noGap)
  ck-input(group="left" label="Label")
  ck-input(group="center" label="Label center" label-align="center")
  ck-input(group="right" label="Label right" label-align="right")
  ck-input(group="left" :label="text" v-model="text")
  ck-input(group="center" placeholder="Example placeholder")
  ck-input(group="right" label="Both, label..." placeholder="... and placeholder")

ComponentShower(title="Group")
  ck-input(group="left" placeholder="Left" noGap)
  ck-input(group="center" label="Center" label-align="center")
  ck-input(group="right" placeholder="Right")

ComponentShower(title="Methods")
  ComponentShowerRow
    ck-input(v-model="testFocusVal" label="Focus" ref="refInputTestFocus")
    ck-button(@click="testFocus()")
      | Focus
  ComponentShowerRow
    ck-input(v-model="testSelectVal" label="Select" ref="refInputTestSelect")
    ck-button(@click="testSelect()")
      | Select

ComponentShower(title="Disabled")
  ck-input(label="Disabled" disabled)
  ck-input(label="Disabled" v-model="disabledText" disabled)
  ck-input(label="Disabled" icon="helicopter" disabled)

ComponentShower(title="Not working")
  ck-input(label="I am required" required)
</template>

<script setup lang="ts">
// name: 'CkInputExample',
import { ref } from 'vue';
import { ckButton, ckInput } from '../../../src/components/index';
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import ComponentShowerRow from '../../layout/componentsShower/ComponentShowerRow.vue';

const refInputTestFocus = ref(null);
const refInputTestSelect = ref(null);

const text = ref('Dynamic label');
const disabledText = ref('Not posible to change');
const testFocusVal = ref('');
const testSelectVal = ref('selectable');


function testFocus() {
  refInputTestFocus.value.setFocus();
}
function testSelect() {
  refInputTestSelect.value.setSelect();
}
</script>

<style lang="stylus" scoped>
@import '../../style/global'
</style>
