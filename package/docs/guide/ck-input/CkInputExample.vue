<template lang="pug">
ComponentShower(title="Default")
  ck-input.ck-component-item
ComponentShower(title="Icon")
  ck-input.ck-component-item-group-left(group="left" label="Icon" icon="helicopter")
  ck-input.ck-component-item-group-center(group="center" label="Icon placeholder" icon="user" placeholder="Buscar...")
  ck-input.ck-component-item-group-right(group="right" label="Icon text" icon="search")
ComponentShower(title="Label / placeholder")
  ck-input.ck-component-item-group-left(group="left" label="Label")
  ck-input.ck-component-item-group-center(group="center" label="Label center" label-align="center")
  ck-input.ck-component-item-group-right(group="right" label="Label right" label-align="right")
  ck-input.ck-component-item(:label="text" v-model="text")
  ck-input.ck-component-item(placeholder="Example placeholder")
  ck-input.ck-component-item(label="Both, label..." placeholder="... and placeholder")
ComponentShower(title="Group")
  ck-input.ck-component-item-group-left(group="left" placeholder="Left")
  ck-input.ck-component-item-group-center(group="center" label="Center" label-align="center")
  ck-input.ck-component-item-group-right(group="right" placeholder="Right")
ComponentShower(title="Disabled")
  ck-input.ck-component-item(label="Disabled" disabled)
  ck-input.ck-component-item(label="Disabled" v-model="disabledText" disabled)
  ck-input.ck-component-item(label="Disabled" icon="helicopter" disabled)
ComponentShower(title="Not working")
  ck-input.ck-component-item(label="I am required" required)
</template>

<script setup lang="ts">
// name: 'CkInputTextExample',
import { ref } from 'vue';
import { ckInput } from '../../../src/components/index';
import ComponentShower from '../../layout/componentsShower/ComponentShower.vue';
const text = ref('Dynamic label');
const disabledText = ref('Not posible to change');
</script>

<style lang="stylus" scoped>
@import '../../style/global'
</style>
