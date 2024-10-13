<script setup lang="ts">
import { ref } from 'vue';
import { ckNotify } from 'cleek';
import type { Ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';
type CkInput = {
  focus: () => void;
  setSelect: () => void;
}; // import { CkInput } from 'cleek';

const autofocusPopup = ref(false);
const refInputTestFocus: Ref<null | CkInput> = ref(null);
const refInputTestSelect: Ref<null | CkInput> = ref(null);

const text = ref('Dynamic label');
const dateExample = ref('2022-03-29');
const datetimeExample = ref('2022-03-29T00:00:00-03:00');
const disabledText = ref('Not posible to change');
const testAutoSelect = ref('click on text');
const testFocusVal = ref('');
const testSelectVal = ref('selectable');
const textSize = ref('size text');
const textLeft = ref('left');
const textCenter = ref('center');
const textRight = ref('right');
const delayChange1 = ref('');
const delayChange2 = ref('');

function testFocus() {
  refInputTestFocus.value?.focus();
}
function testSelect() {
  refInputTestSelect.value?.setSelect();
}

// TODO, needs explanation:
// iconRight?: Icon;
// groupVertical?: AlignVertical;
// widthBreaks?: WidthBreaks;
// hideBorder?: boolean;
// width?: string;
// align?: Align;
// borderColor?: Color;
// autoSelect?: boolean;
// delayChangeTime?: number;
</script>

<template lang="pug">
ComponentShower(title="Default")
  ck-input
//- ComponentShower(title="Group break")
//-   ComponentShowerRow(noGap)
//-     ck-input(label="Group break S 1" group="left" line-break="s")
//-     ck-input(label="Group break S 2" group="center" line-break="s")
//-     ck-input(label="Group break S 3" group="right" line-break="s")
//-   ComponentShowerRow(noGap)
//-     ck-input(label="Group break 800px 1" group="left" line-break="800")
//-     ck-input(label="Group break 800px 2" group="center" line-break="800")
//-     ck-input(label="Group break 800px 3" group="right" line-break="800")

//- layout
ComponentShower(title="Layout")
  ComponentShowerRow(title="rounded")
    ck-input(label="Text (default)" layout="rounded")
    ck-input(label="Number" type="number" layout="rounded")
    ck-input(label="Password" type="password" layout="rounded")
  ComponentShowerRow(title="base")
    ck-input(label="Text (default)" layout="base")
    ck-input(label="Number" type="number" layout="base")
    ck-input(label="Password" type="password" layout="base")
  ComponentShowerRow(title="squared")
    ck-input(label="Text (default)" layout="squared")
    ck-input(label="Number" type="number" layout="squared")
    ck-input(label="Password" type="password" layout="squared")

//- size
ComponentShower(title="Size")
  ck-input(v-model="textSize" size="s" label="Size s")
  ck-input(v-model="textSize" size="m" label="Size m (default)")
  ck-input(v-model="textSize" size="l" label="Size l")
  ck-input(v-model="textSize" size="xl" label="Size xl")

//- icon
ComponentShower(title="Icon" noGap)
  ck-input(group="left" label="Icon" icon="helicopter")
  ck-input(group="center" label="Icon placeholder" icon="user" placeholder="Buscar...")
  ck-input(group="right" label="Icon text" icon="search")

//- group
ComponentShower(title="Group")
  ComponentShowerRow(noGap title="group")
    ck-input(group="left" label="left")
    ck-input(group="center" label="center")
    ck-input(group="right" label="right")
  ComponentShowerRow(noGap title="group-vertical")
    .flex.w-full
      ck-input(group="left" placeholder="left" group-vertical="top")
      ck-input(group="center" placeholder="center" group-vertical="top")
      ck-input(group="right" placeholder="right" group-vertical="top")
    .flex.w-full
      ck-input(group="left" placeholder="left" group-vertical="center")
      ck-input(group="center" placeholder="center" group-vertical="center")
      ck-input(group="right" placeholder="right" group-vertical="center")
    .flex.w-full
      ck-input(group="left" placeholder="left" group-vertical="bottom")
      ck-input(group="center" placeholder="center" group-vertical="bottom")
      ck-input(group="right" placeholder="right" group-vertical="bottom")

//- Label - placeholder
ComponentShower(title="Label / placeholder")
  ComponentShowerRow(noGap)
    ck-input(group="left" label="Label")
    ck-input(group="center" label="Label center" label-align="center")
    ck-input(group="right" label="Label right" label-align="right")
  ComponentShowerRow(noGap)
    ck-input(group="left" :label="text" v-model="text")
    ck-input(group="center" placeholder="Example placeholder")
    ck-input(group="right" label="Both, label..." placeholder="... and placeholder")

//- align
ComponentShower(title="Align")
  ComponentShowerRow
    ck-input(label="left" align="left")
    ck-input(label="center" align="center")
    ck-input(label="right" align="right")
  ComponentShowerRow
    ck-input(placeholder="left" align="left")
    ck-input(placeholder="center" align="center")
    ck-input(placeholder="right" align="right")
  ComponentShowerRow
    ck-input(v-model="textLeft" align="left")
    ck-input(v-model="textCenter" align="center")
    ck-input(v-model="textRight" align="right")
  
//- type
ComponentShower(title="Type")
  ck-input(label="Text (default)")
  ck-input(label="Number" type="number")
  ck-input(label="Password" type="password")
  ck-input(label="Date" type="date" v-model="dateExample")
  ck-input(label="Date (passing datetime)" type="date" v-model="datetimeExample")

//- border
ComponentShower(title="Border")
  ComponentShowerRow(title="Hide border")
    ck-input(label="Default")
    ck-input(label="hideBorder" hideBorder placeholder="I'm here")
  ComponentShowerRow(title="Border color")
    ck-input(label="primary" borderColor="primary")
    ck-input(label="secondary" borderColor="#15b0ce")
    ck-input(label="red" borderColor="red")

//- disabled
ComponentShower(title="Disabled")
  ck-input(label="Disabled" disabled)
  ck-input(label="Disabled" v-model="disabledText" disabled)
  ck-input(label="Disabled" icon="helicopter" disabled)

//- methods
ComponentShower(title="Methods")
  ComponentShowerRow(title="autoSelect")
    ck-input(v-model="testAutoSelect" label="autoSelect" autoSelect)
  ComponentShowerRow(title="input.focus()")
    ck-input(v-model="testFocusVal" label="Focus" ref="refInputTestFocus")
    ck-button(@click="testFocus()")
      | Focus
  ComponentShowerRow(title="input.setSelect()")
    ck-input(v-model="testSelectVal" label="Select" ref="refInputTestSelect")
    ck-button(@click="testSelect()")
      | Select

//- emits
ComponentShower(title="Emits")
  ck-input(label="input" @input="ckNotify.notifySuccess('input')")
  ck-input(label="change" @change="ckNotify.notifySuccess('change')")
  ck-input(v-model="delayChange1" label="changeDelayed" @changeDelayed="ckNotify.notifySuccess('changeDelayed')")
  ck-input(v-model="delayChange2" label="changeDelayed (custom time 1s)" :delayChangeTime="1000" @changeDelayed="ckNotify.notifySuccess('changeDelayed (custom time 1s)')")
  ck-input(label="click" @click="ckNotify.notifySuccess('click')")
  ck-input(label="focus" @focus="ckNotify.notifySuccess('focus')")
  ck-input(label="blur" @blur="ckNotify.notifySuccess('blur')")
  ck-button(@click="autofocusPopup = true")
    | Autofocus

ck-popup(v-model="autofocusPopup" title="Test autofocus")
  p On mounted, automatically set focus
  ck-input(autofocus)

PropsAndEmitsShower(
:propsList="propsAndEmits.input.props"
:emitsList="propsAndEmits.input.emits"
)
</template>
