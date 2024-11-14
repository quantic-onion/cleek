<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
import { qmStr } from 'quantic-methods';
// components
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type { Align, AlignVertical, Color, Icon, IconPack, Layout, WidthBreaks } from '../cleek-options/cleek-options.types';

type OptionValue = any;
type Option = any;

const valueSelected = defineModel<OptionValue>({ required: true });

const props = withDefaults(
  defineProps<{
    options: Option[];
    // reduce value
    reduceValueProp?: string;
    reduceValueMethod?: string;
    reduceValueFunction?: (option: Option) => OptionValue;
    // reduce name
    reduceNameProp?: string;
    reduceNameMethod?: string;
    reduceNameFunction?: (option: Option) => string;
    notReduce?: boolean;
    notReduceValue?: boolean;
    notClearable?: boolean;
    clearValue?: any;
    autofocus?: boolean;
    width?: string;
    minWidth?: string;
    layout?: Layout;
    noBorder?: boolean;
    borderColor?: Color;
    bgTransparent?: boolean;
    disabled?: boolean;
    // group
    group?: Align;
    groupVertical?: AlignVertical;
    widthBreaks?: WidthBreaks;
    // icon
    icon?: Icon;
    iconRight?: Icon;
    iconPack?: IconPack;
    iconColor?: Color;
    // label
    label?: string;
    labelAlign?: Align;
    optional?: boolean;
    // placeholder
    placeholder?: string;
    emptyOptionsMsg?: string;
    backgroundColor?: Color;
  }>(),
  {
    reduceValueProp: 'id',
    reduceNameProp: 'name',
    minWidth: '180px',
    // icon
    iconColor: 'lightgrey',
    // placeholder
    placeholder: '',
    emptyOptionsMsg: '',
  },
);

const emit = defineEmits<{
  change: [event: Event];
  click: [event: Event];
}>();

defineExpose({
  focus,
  blur,
});

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();
const selectRef = ref<HTMLElement>();

const isOptionsEmpty = computed(() => !props.options.length);
const isDisabled = computed(() => props.disabled || isOptionsEmpty.value);
const finalClearValue = computed(() => {
  if (props.clearValue) return props.clearValue;
  if (cleekOptions.value.select?.clearValue) return cleekOptions.value.select.clearValue;
});
const realClearValue = computed(() => {
  if (finalClearValue.value) return finalClearValue.value;
  const value = valueSelected.value;
  switch (typeof value) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'object':
      if (!value) return null;
      if (Array.isArray(value)) return [];
      return {};
    default:
      return null;
  }
});
const isDefaultValue = computed(() => {
  const value = valueSelected.value;
  if (finalClearValue.value) return value === finalClearValue.value;
  if (typeof value === 'number') return value === 0;
  if (typeof value === 'string') return value === '';
  if (typeof value === 'object') {
    if (!value) return value === null;
    // array is also object
    if (Array.isArray(value)) return value.length === 0;
    return Object.keys(value).length === 0;
  }
  return value === null;
});
const finalPlaceholder = computed(() => {
  if (isOptionsEmpty.value) return props.emptyOptionsMsg;
  return props.placeholder;
});
const isDisplayingPlaceholder = computed(() => (isOptionsEmpty.value || isDefaultValue.value) && finalPlaceholder.value);
const isDisplayingClearBtn = computed(() => {
  if (props.notClearable) return false;
  return !isDefaultValue.value;
});
const selectContainerClass = computed(() => {
  const list = [];
  // icon
  if (props.icon) list.push('has-icon-left');
  if (props.iconRight) list.push('has-icon-right');
  return list;
});
const selectContainerStyle = computed(() => {
  const list = [];
  // width-break
  let isWidthDefined = false;
  if (props.widthBreaks) {
    const width = hooks.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value);
    if (width) {
      list.push({ width });
      isWidthDefined = true;
    }
  }
  // minWidth
  if (!isWidthDefined && props.minWidth) list.push({ 'min-width': props.minWidth });
  // width
  if (props.width) list.push({ width: props.width });
  return list;
});
const selectClass = computed(() => {
  const list = [];
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(layout);
  // clear able
  if (isDisplayingClearBtn.value) list.push('clearable');
  // border-color
  const borderColor = props.borderColor || cleekOptions.value.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  return list;
});
const selectStyle = computed(() => {
  const list = [];
  // border-color
  const borderColor = props.borderColor || cleekOptions.value.styles.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value.select.backgroundColor) backgroundColor = cleekOptions.value.select.backgroundColor;
  if (cleekOptions.value.darkMode) backgroundColor = cleekOptions.value.darkModeColorItems;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  // text-color
  let textColor = cleekOptions.value.popup.textColor;
  if (cleekOptions.value.darkMode) textColor = cleekOptions.value.darkModeColorText;
  if (textColor) {
    if (hooks.isColorTemplateVariable(textColor)) {
      list.push(`ck-component__color--${textColor}`);
    } else {
      list.push({ color: textColor });
    }
  }
  return list;
});
const optionStyle = computed(() => {
  const list = [];
  // text-color
  let textColor = cleekOptions.value.popup.textColor;
  if (cleekOptions.value.darkMode) textColor = cleekOptions.value.darkModeColorText;
  if (textColor) {
    if (hooks.isColorTemplateVariable(textColor)) {
      list.push(`ck-component__color--${textColor}`);
    } else {
      list.push({ color: textColor });
    }
  }
  return list;
});

function focus() {
  selectRef.value?.focus();
}
function blur() {
  selectRef.value?.blur();
}
function getOptionValue(option: Option) {
  if (props.reduceValueFunction) return props.reduceValueFunction(option);
  if (props.notReduceValue || props.notReduce) return option;
  if (props.reduceValueMethod) return option[props.reduceValueMethod]();
  return option[props.reduceValueProp];
}
function getOptionName(option: Option) {
  if (props.reduceNameFunction) return props.reduceNameFunction(option);
  if (props.notReduce) return option;
  if (props.reduceNameMethod) return option[props.reduceNameMethod]();
  return option[props.reduceNameProp];
}
function setClearValue() {
  valueSelected.value = realClearValue.value;
}
</script>

<template>
  <div class="ck-select" :class="selectContainerClass" :style="selectContainerStyle">
    <!-- label -->
    <ck-label v-if="label" :align="labelAlign" for="ck-select">
      {{ label }} <span v-if="optional" class="ck-select--optional-label">opcional</span>
    </ck-label>
    <!-- select -->
    <select
      ref="selectRef"
      v-model="valueSelected"
      :class="selectClass"
      :style="selectStyle"
      :disabled="isDisabled"
      @change="emit('change', $event)"
      @click="emit('change', $event)"
    >
      <!-- option -->
      <option v-for="option in options" :value="getOptionValue(option)" :key="option" :style="optionStyle">
        {{ getOptionName(option) }}
      </option>
    </select>
    <!-- placeholder -->
    <span v-if="isDisplayingPlaceholder" class="ck-select--placeholder" v-text="finalPlaceholder" />
    <!-- icon left -->
    <ck-icon v-if="icon" class="ck-select--icon-left" :icon="icon" :icon-pack="iconPack" :color="iconColor" />
    <!-- icon right -->
    <ck-icon v-if="iconRight" class="ck-select--icon-right" :icon="iconRight" :icon-pack="iconPack" :color="iconColor" />
    <!-- clear btn -->
    <div v-if="isDisplayingClearBtn" class="ck-select--clear-btn" @click="setClearValue()">
      <ck-icon icon="times" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-select
  position relative
  display inline-block
  .ck-select--optional-label
    font-size 0.75rem
    padding-left 0.25rem
    margin-left auto
    color #aaa
  select
    font-size $globalFontSize
    box-sizing border-box
    height $globalMinHeight
    width 100%
    padding $globalPadding
    border 1px solid $globalBorderColor
    border-radius $globalBorderRadius
    &.rounded
      border-radius 10rem
    &.squared
      border-radius 0
    &.clearable
      padding-right 3rem
    &:focus
      border-color var(--primary)
      border-radius-bottom(1px)
      outline 0
    &:disabled
      input-disabled()
    option
      font-size 0.9rem
      color #333
  .ck-select--placeholder
    font-size 0.9rem
    position absolute
    left 12px
    bottom 12px
    color $color-placeholder
    pointer-events none
  .ck-select--icon-left
  .ck-select--icon-right
    position absolute
    bottom 13px
    z-index 1
  .ck-select--icon-left
    left 1.5 * $globalPadding
  .ck-select--icon-right
    right 1.5 * $globalPadding
  .ck-select--clear-btn
    cursor pointer
    position absolute
    right 1.25rem
    bottom 7.5px
    height 25px
    width @height
    border-radius 5px
    color #666
    flex-center()
    transition 0.3s
    &:hover
      background-color rgba(black, 0.025)
  &.has-icon-left
    select
      padding-left 14px + 3 * $globalPadding
    .ck-select--placeholder
      padding-left 28px
  &.has-icon-right
    select
      padding-right 14px + 3 * $globalPadding
    .ck-select--placeholder
      padding-right 28px
</style>
