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

const optionValueSelected = defineModel<OptionValue>({ required: true });

const props = withDefaults(
  defineProps<{
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
    options?: Option[];
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
  },
);

const emit = defineEmits<{
  change: [event: Event];
  click: [event: Event];
}>();

defineExpose({
  focus,
});

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();
const search = ref('');

const optionsFiltered = computed(() => {
  const options = props.options || [];
  return options.filter((option) => {
    const name = getOptionName(option);
    return qmStr.checkContainsStr(name, search.value);
  });
});
const isClearBtnVisible = computed(() => {
  if (props.notClearable) return false;
  if (valueIsDefault.value) return false;
  return true;
});
const computedClassSelect = computed(() => {
  const list = [];
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(layout);
  // clear able
  if (isClearBtnVisible.value) list.push('clear-able');
  // border-color
  const borderColor = props.borderColor || cleekOptions.value.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  return list;
});
const computedStyleSelect = computed(() => {
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
const computedStyleOption = computed(() => {
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
const computedClass = computed(() => {
  const list = [];
  // icon
  if (props.icon) list.push('has-icon-left');
  if (props.iconRight) list.push('has-icon-right');
  return list;
});
const computedStyle = computed(() => {
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
const finalClearValue = computed(() => {
  if (props.clearValue) return props.clearValue;
  if (cleekOptions.value.select?.clearValue) return cleekOptions.value.select.clearValue;
  return 'auto';
});
const realClearValue = computed(() => {
  if (finalClearValue.value !== 'auto') return finalClearValue.value;
  const option = optionValueSelected.value;
  switch (typeof option) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'object':
      if (!option) return null;
      if (Array.isArray(option)) return [];
      return {};
    default:
      return null;
  }
});
const valueIsDefault = computed(() => {
  const option = optionValueSelected.value;
  if (finalClearValue.value !== 'auto') return option === finalClearValue.value;
  if (typeof option === 'number') return option === 0;
  if (typeof option === 'string') return option === '';
  if (typeof option === 'object') {
    if (!option) return option === null;
    // array is also object
    if (Array.isArray(option)) return option.length === 0;
    return Object.keys(option).length === 0;
  }
  return option === null;
});
const isPlaceholderVisible = computed(() => {
  if (!props.placeholder) return;
  return valueIsDefault.value;
});
const isOptionsListEmpty = computed(() => !optionsFiltered.value.length);
const isEmptyOptionsMsgVisible = computed(() => isOptionsListEmpty.value);

// function onBlur(event: Event) {
//   const isValid = checkOptionsIsValid(event.target.value);
//   if (!isValid) event.target.value = lastSelectedValue.value;
//   lastSelectedValue.value = null;
// }
// function onFocus(event: Event) {
//   lastSelectedValue.value = search.value;
//   search.value = '';
//   emit('focus', event);
// }
// function checkOptionsIsValid(optionName) {
//   if (!optionName) return false;
//   return props.options.some(i => getOptionName(i) === optionName);
// }
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
  optionValueSelected.value = realClearValue.value;
}
</script>

<template>
  <div class="ck-select" :style="computedStyle" :class="computedClass">
    <!-- icon left -->
    <ck-icon
      v-if="icon"
      class="ck-select__icon-left"
      :icon="icon"
      :icon-pack="iconPack"
      :color="iconColor ? iconColor : 'lightgrey'"
    />
    <!-- icon right -->
    <ck-icon
      v-if="iconRight"
      class="ck-select__icon-right"
      :icon="iconRight"
      :icon-pack="iconPack"
      :color="iconColor ? iconColor : 'lightgrey'"
    />
    <div v-if="isClearBtnVisible" class="ck-select__clear-btn" @click="setClearValue()">
      <ck-icon icon="times" />
    </div>
    <!-- label -->
    <ck-label v-if="label" :align="labelAlign" for="ck-select">
      {{ label }} <span v-if="optional" class="ck-select__optional-label">opcional</span>
    </ck-label>
    <!-- select -->
    <select
      v-model="optionValueSelected"
      :class="computedClassSelect"
      :style="computedStyleSelect"
      :disabled="disabled || isOptionsListEmpty"
      @change="emit('change', $event)"
      @click="emit('change', $event)"
    >
      <!-- option -->
      <option v-for="option in optionsFiltered" :value="getOptionValue(option)" :key="option" :style="computedStyleOption">
        {{ getOptionName(option) }}
      </option>
    </select>
    <span v-if="isEmptyOptionsMsgVisible" class="ck-select--placeholder">
      {{ emptyOptionsMsg }}
    </span>
    <span v-else-if="isPlaceholderVisible" class="ck-select--placeholder">
      {{ placeholder }}
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.ck-select
  display inline-block
  position relative
  .ck-select__optional-label
    color #aaa
    font-size 0.75rem
    padding-left 0.25rem
    margin-left auto
  select
    cursor text
    width 100%
    border 1px solid $globalBorderColor
    height $globalMinHeight
    border-radius $globalBorderRadius
    font-size $globalFontSize
    padding $globalPadding
    box-sizing border-box
    &.rounded
      border-radius 10rem
    &.squared
      border-radius 0
    &.clear-able
      padding-right 3rem
    &:focus
      border-color var(--primary)
      outline 0
      border-radius-bottom(1px)
    &:disabled
      input-disabled()
    option
      color #333
      font-size 0.9rem
      // cursor pointer // NOT WORKING
      // padding .25rem // NOT WORKING
  // icon
  > .ck-select__icon-left
  > .ck-select__icon-right
    position absolute
    bottom 13px
    z-index 1
  > .ck-select__icon-left
    left 1.5 * $globalPadding
  > .ck-select__icon-right
    right 1.5 * $globalPadding
  .ck-select__clear-btn
    position absolute
    right 0
    bottom 0
    display flex
    align-items center
    justify-content center
    cursor pointer
    height 25px
    border-radius 5px
    width @height
    margin-bottom 40px - @height / 2
    margin-right 1.25rem
    color #666
    transition 0.3s
    &:hover
      background-color rgba(black, 0.025)
  .ck-select--placeholder
    position absolute
    color $color-placeholder
    left 12px
    bottom 12px
    font-size 0.9rem
    pointer-events none

.ck-select
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
  // .ck-select__chevron-icon
  //   position absolute
  //   right 10px
  //   bottom 10px
</style>
