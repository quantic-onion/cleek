<template lang="pug">
.ck-icon(
:class="computedClass"
:style="computedStyle"
@click="onClick($event)"
)
  font-awesome-icon(
  v-if="computediconPack === 'font-awesome'"
  :icon="icon"
  :size="size"
  :rotation="rotation"
  :flip="flip"
  :pull="pull"
  :spin="spin"
  :pulse="pulse"
  :inverse="inverse"
  :fixed-width="fixedWidth"
  :swap-opacity="swapOpacity"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import functions from '../utils/functions';

library.add(fas);
library.add(far);
library.add(fab);

const props = defineProps({
  icon: { type: [String, Array], default: '' },
  color: { type: String, default: '' },
  iconPack: { type: String, default: '' },
  size: { type: String, default: null }, // xs || lg || 6x
  rotation: { type: String, default: null }, // 90 || 180 || 270
  flip: { type: String, default: null }, // horizontal || vertical || both
  pull: { type: String, default: null }, // left || right
  spin: { type: Boolean, default: false }, // true actives animation
  pulse: { type: Boolean, default: false }, // true actives animation
  inverse: { type: Boolean, default: false },
  fixedWidth: { type: Boolean, default: false },
  swapOpacity: { type: Boolean, default: false },
});

const emits = defineEmits(['click']);

const computediconPack = computed(() => {
  const defaultPackage = 'font-awesome';
  if (props.iconPack === '') return defaultPackage;
  if (props.iconPack === 'feather') return props.iconPack;
  return defaultPackage;
});
const computedClass = computed(() => {
  const list = [];
  // group
  if (props.color && functions.isColorTemplateVariable(props.color)) {
    list.push(`ck-component__color--${props.color}`);
  }
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // group
  if (props.color && !functions.isColorTemplateVariable(props.color)) {
    list.push({ color: props.color })
  }
  return list;
});

function onClick(event) {
  emits('click', event)
}
</script>

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
</style>