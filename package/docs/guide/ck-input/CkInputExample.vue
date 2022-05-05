<template lang="pug">
ComponentShower(title="Default")
  ck-input

ComponentShower(title="Group break")
  ComponentShowerRow(noGap)
    ck-input(label="Group break S 1" group="left" line-break="s")
    ck-input(label="Group break S 2" group="center" line-break="s")
    ck-input(label="Group break S 3" group="right" line-break="s")
  ComponentShowerRow(noGap)
    ck-input(label="Group break 800px 1" group="left" line-break="800")
    ck-input(label="Group break 800px 2" group="center" line-break="800")
    ck-input(label="Group break 800px 3" group="right" line-break="800")

ComponentShower(title="Type")
  ck-input(label="Text (default)")
  ck-input(label="Number" type="number")
  ck-input(label="Password" type="password")

ComponentShower(title="Rounded")
  ck-input(label="Text (default)" rounded)
  ck-input(label="Number" type="number" rounded)
  ck-input(label="Password" type="password" rounded)

ComponentShower(title="Size")
  ck-input(v-model="textSize" size="s" label="Size s")
  ck-input(v-model="textSize" size="m" label="Size m (default)")
  ck-input(v-model="textSize" size="l" label="Size l")
  ck-input(v-model="textSize" size="xl" label="Size xl")

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
const textSize = ref('size text');


function testFocus() {
  refInputTestFocus.value.setFocus();
}
function testSelect() {
  refInputTestSelect.value.setSelect();
}
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
