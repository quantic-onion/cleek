<template lang="pug">
ComponentShower(title="Default")
  p State: {{ state }}
  ck-switch(v-model="state")
    | Switch
  ck-switch(v-model="stateTrue")
    | Switch true

ComponentShower(title="Size")
  ComponentShowerRow
    ck-switch(v-model="stateTrue" size="xs")
      | Size XS
    ck-switch(v-model="stateTrue" size="s")
      | Size S
    ck-switch(v-model="stateTrue" size="m")
      | Size M
    ck-switch(v-model="stateTrue" size="l")
      | Size L
  ComponentShowerRow
    ck-switch(v-model="stateTrue" size="xs" icon="dollar-sign")
      | Size XS
    ck-switch(v-model="stateTrue" size="s" icon="dollar-sign")
      | Size S
    ck-switch(v-model="stateTrue" size="m" icon="dollar-sign")
      | Size M
    ck-switch(v-model="stateTrue" size="l" icon="dollar-sign")
      | Size L

ComponentShower(title="Icon")
    ck-switch(icon="dollar-sign" v-model="state")
      | Icon
    ck-switch(icon="user" v-model="stateTrue")
      | Icon  true
    ck-switch(outlined icon="user" v-model="state")
      | Icon outlined

ComponentShower(title="Outlined")
    ck-switch(outlined v-model="state")
      | Switch Outlined
    ck-switch(Outlined v-model="stateTrue")
      | Switch Outlined true

ComponentShower(title="Squared")
    ck-switch(squared v-model="state")
      | Switch Square
    ck-switch(squared v-model="stateTrue")
      | Switch Square true
    ck-switch(squared outlined v-model="state")
      | Switch Square Outlined

ComponentShower(title="Disabled")
  ck-switch(:modelValue="false" disabled)
    | Unchecked disabled
  ck-switch(:modelValue="true" disabled)
    | Checked disabled
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
import ComponentShowerRow from '../../layout/componentsShower/ComponentShowerRow.vue';
import { ckSwitch } from '../../../src/components/index'

const state = ref(false);
const stateTrue = ref(true);
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
