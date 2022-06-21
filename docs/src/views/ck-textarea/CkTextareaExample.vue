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
  ck-textarea(label="Bothe (default)")
  ck-textarea(label="Resize none" resize="none")
  ck-textarea(label="Resize vertical" resize="vertical")
  ck-textarea(label="Resize horizontal" resize="horizontal")
ComponentShower(title="Disabled")
  ck-textarea(placeholder="Oh :( it's disabled" disabled)
  
PropsAndEmitsShower(
:propsList="propsAndEmits.textarea.props"
:emitsList="propsAndEmits.textarea.emits"
)
</template>
