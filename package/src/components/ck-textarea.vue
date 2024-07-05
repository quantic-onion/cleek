<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// components
import CkLabel from './ck-label.vue';
// types
import type { Align, AlignVertical, Color, CleekOptions, Layout, SizeInCSS } from '../types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
import { qmStr } from 'quantic-methods';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
  placeholder?: string;
  resize?: true | 'none' | 'vertical' | 'horizontal';
  // style
  layout?: Layout;
  borderColor?: Color;
  align?: Align;
  group?: Align;
  groupVertical?: AlignVertical;
  borderRadius?: SizeInCSS;
  fontSize?: SizeInCSS;
  textColor?: Color;
  width?: SizeInCSS;
  height?: SizeInCSS;
  // functions
  capitalize?: boolean;
  autoSelect?: boolean;
  delayChangeTime?: number;
  // label
  label?: string;
  labelAlign?: Align;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', event: Event): void;
  (e: 'change', event: Event): void;
  (e: 'click', event: Event): void;
  (e: 'delayChange', value: string): void;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();
const refTextarea: Ref<null | HTMLTextAreaElement> = ref(null);
const { windowWidth } = useWindowWidth();
const defaultDelayChangeTime = 300;

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    if (props.capitalize) val = qmStr.capitalize(val);
    emits('update:modelValue', val);
    checkSearchTime(val);
  },
});
const computedClassTextarea = computed(() => {
  const list = [];
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(layout);
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  return list;
});
const computedStyleTextarea = computed(() => {
  const list = [];
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles?.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // align
  if (props.align) list.push(`align--${props.align}`);
  // font-size
  if (props.fontSize) list.push({ 'font-size': props.fontSize });
  // border-radius
  if (props.borderRadius) list.push({ 'border-radius': props.borderRadius });
  // text-color
  if (props.textColor) list.push({ color: props.textColor });
  // width
  if (props.width) list.push({ width: props.width });
  // height
  if (props.height) list.push({ height: props.height });
  // resize
  const resize = props.resize ? props.resize : 'none';
  if (resize) list.push({ resize: resize || 'both' });
  return list;
});

// events
const onClick = (event: Event) => {
  if (props.autoSelect) refTextarea.value?.select();
  emits('click', event);
};
const onInput = (event: Event) => {
  emits('input', event);
};
const onChange = (event: Event) => {
  emits('change', event);
};

function checkSearchTime(oldValue: string) {
  setTimeout(() => {
    if (inputValue.value === oldValue) emits('delayChange', oldValue);
  }, props.delayChangeTime || defaultDelayChangeTime);
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <div class="ck-textarea">
    <ck-label v-if="label" :label-align="labelAlign">
      {{ label }}
    </ck-label>
    <textarea
      v-model="inputValue"
      ref="refTextarea"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="computedClassTextarea"
      :style="computedStyleTextarea"
      @click="onClick($event)"
      @input="onInput($event)"
      @change="onChange($event)"
    />
  </div>
</template>

<style lang="stylus" scoped>
.ck-textarea
  display flex
  flex-direction column
  textarea
    color #333
    min-height 2.25rem
    width 100%
    max-width 100%
    height 6rem
    box-sizing border-box
    font-family inherit
    padding $globalPadding
    // font-size $globalFontSize * (85/100)
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    &:focus
      outline-color var(--primary)
    &.rounded
      border-radius 1.25rem
    &.squared
      border-radius 0
    &.align--left
      text-align left
    &.align--right
      text-align right
</style>
