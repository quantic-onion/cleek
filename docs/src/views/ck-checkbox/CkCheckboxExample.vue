<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';

const state = ref(false);
const state2 = ref(false);
const state3 = ref(true);
</script>

<template lang="pug">
ComponentShower
  ComponentShowerRow
    ck-checkbox(v-model="state")
      | Checkbox
    p State: {{ state }}
  ComponentShowerRow(title="values")
    ck-checkbox(v-model="state2")
      | {{ state2 }}
    ck-checkbox(v-model="state3")
      | {{ state3 }}
  ComponentShowerRow(title="disabled")
    ck-checkbox(:modelValue="false" disabled)
      | Unchecked disabled
    ck-checkbox(:modelValue="true" disabled)
      | Checked disabled

PropsAndEmitsShower(
:propsList="propsAndEmits.checkbox.props"
:emitsList="propsAndEmits.checkbox.emits"
)
</template>

