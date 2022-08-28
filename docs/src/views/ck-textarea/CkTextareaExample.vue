<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits'

const labelTextLeft = ref('');
const labelTextCenter = ref('');
const labelTextRight = ref('');
const placeholderLabelText = ref('');
const noLabelText = ref('');
const requiredText = ref('');
const valueCapitalize = ref('');
const valueAutoSelect = ref('Text will be selected on click');
</script>

<template lang="pug">
ComponentShower(title="Default")
  ck-textarea
ComponentShower(title="Placeholder / Label")
  ComponentShowerRow(title="Placeholder")
    ck-textarea(
    placeholder="Write something here"
    v-model="placeholderLabelText"
    )
  ComponentShowerRow(title="Label and label-align")
    ck-textarea(v-model="labelTextLeft" label="Label left (default)")
    ck-textarea(v-model="labelTextCenter" label="Label center" label-align="center")
    ck-textarea(v-model="labelTextRight" label="Label right" label-align="right")
ComponentShower(title="Resize")
  ck-textarea(label="None (default)")
  ck-textarea(label="Both | true" resize="both")
  ck-textarea(label="Vertical" resize="vertical")
  ck-textarea(label="Horizontal" resize="horizontal")
ComponentShower(title="Disabled")
  ck-textarea(placeholder="Oh :( it's disabled" disabled)
ComponentShower(title="Functions")
  ComponentShowerRow(title="capitalize")
    ck-textarea(
    v-model="valueCapitalize"
    capitalize
    placeholder="The first character will be automatically capitalized"
    )
    ck-textarea(v-model="valueAutoSelect" autoSelect)
ComponentShower(title="Group")
  ComponentShowerRow(title="group" noGap)
    ck-textarea.flex(placeholder="left" group="left")
    ck-textarea.flex(placeholder="center" group="center")
    ck-textarea.flex(placeholder="right" group="right")
  ComponentShowerRow(title="group-vertical" noGap block)
    ck-textarea(placeholder="top" group-vertical="top")
    ck-textarea(placeholder="center" group-vertical="center")
    ck-textarea(placeholder="bottom" group-vertical="bottom")
ComponentShower(title="Styles")
  ComponentShowerRow(title="border-color")
    ck-textarea(placeholder="primary" border-color="primary")
    ck-textarea(placeholder="secondary" border-color="secondary")
    ck-textarea(placeholder="red" border-color="red")
    ck-textarea(placeholder="#15b0ce" border-color="#15b0ce")
  ComponentShowerRow(title="font-size")
    ck-textarea(placeholder="default")
    ck-textarea(placeholder="1.25rem" font-size="1.25rem")
    ck-textarea(placeholder="2.5rem" font-size="2.5rem")
  ComponentShowerRow(title="width")
    ck-textarea(width="40px")
    ck-textarea(width="30rem")
  ComponentShowerRow(title="height")
    ck-textarea(placeholder="6rem (default)")
    ck-textarea(height="50px")
    ck-textarea(height="8rem")
  
PropsAndEmitsShower(
:propsList="propsAndEmits.textarea.props"
:emitsList="propsAndEmits.textarea.emits"
)
</template>
