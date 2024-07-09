<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// types
import type { Align, CleekOptions } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  for?: string;
  align: Align;
  size?: 's' | 'm' | 'l' | 'xl';
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();
const defaultSize = 'm';

const computedClass = computed(() => {
  const list = [];
  // align
  let align = 'left';
  if (props.align === 'center' || props.align === 'right') align = props.align;
  list.push(`ck-align--${align}`);
  // size
  list.push(`ck-size--${props.size || defaultSize}`);
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // text-color
  let textColor = cleekOptions.value?.popup.textColor;
  if (cleekOptions.value?.darkMode) textColor = cleekOptions.value?.darkModeColorText;
  if (textColor) {
    if (hooks.isColorTemplateVariable(textColor)) {
      list.push(`ck-component__color--${textColor}`);
    } else {
      list.push({ color: textColor });
    }
  }
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <label class="ck-label" :for="props.for" :class="computedClass" :style="computedStyle">
    <slot />
  </label>
</template>

<style lang="stylus" scoped>
.ck-label
  width 100%
  padding-x 0.5rem
  display flex
  font-size 0.9rem
  color #626262
  box-sizing border-box
  &.ck-align--left
    justify-content flex-start
  &.ck-align--right
    justify-content flex-end
  &.ck-align--center
    justify-content center
  &.ck-size--s
    font-size 0.7rem
  &.ck-size--l
    padding-x 0.5rem
    font-size 1.25rem
  &.ck-size--xl
    padding-x 0.75rem
    font-size 1.5rem
</style>
