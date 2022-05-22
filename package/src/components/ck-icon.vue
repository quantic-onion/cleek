<script setup lang="ts">
import { computed } from 'vue';
// libraries
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// hooks
import functions from '../utils/functions';

const props = defineProps<{
  icon: string | [string, string];
  color?: string;
  iconPack?: string;
  size?: string; // xs || lg || 6x
  rotation?: string; // 90 || 180 || 270
  flip?: 'horizontal' | 'vertical' | 'both';
  pull?: 'left' | 'right';
  spin?: boolean; // true actives animation
  pulse?: boolean; // true actives animation
  inverse?: boolean;
  fixedWidth?: boolean;
  swapOpacity?: boolean;
}>();

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

function onClick(event: Event) {
  emits('click', event)
}

functions.preventUnusedError([
  onClick,
  computedStyle,
]);
</script>

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

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
</style>