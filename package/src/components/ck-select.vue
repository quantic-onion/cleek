<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// components
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// composables
import { useScrollListener } from '@/composables/use-scroll-listener.composable';
// utils
import { normalizeText } from '@/utils/string-helpers';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type { CSSProperties } from 'vue';
import type { Align, AlignVertical, Color, Icon, IconPack, Layout, WidthBreaks } from '../cleek-options/cleek-options.types';

type OptionValue = any;
type Option = any;

const valueSelected = defineModel<OptionValue>({ required: true });

const props = withDefaults(
  defineProps<{
    options: Option[];
    optionsLimit?: number;
    isLoading?: boolean;
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
    optionsLimit: 6,
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
  change: [val: OptionValue];
  click: [event: Event];
}>();

defineExpose({
  focus,
  blur,
});

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();
const selectRef = ref<HTMLElement>();
const inputRef = ref<HTMLInputElement>();
const dropdownRef = ref<HTMLElement>();
const dropdownStyle = ref<CSSProperties>();
const inputValue = ref('');
const isInputFocused = ref(false);
const forceToDisplayAllOptions = ref(false);
const indexSelected = ref(-1);

const optionSelected = computed(() => props.options.find((option) => getOptionValue(option) === valueSelected.value));
const optionsLength = computed(() => props.options.length);
const isOptionsEmpty = computed(() => !optionsLength.value);
const isDisplayingSelect = computed(() => optionsLength.value <= props.optionsLimit);
const optionsToDisplay = computed(() => {
  if (forceToDisplayAllOptions.value) return props.options;
  const words = normalizeText(inputValue.value).split(' ');
  return props.options.filter((option) => {
    const description = normalizeText(getOptionName(option));
    return words.every((word) => description.includes(word));
  });
});
const optionsToDisplayLength = computed(() => optionsToDisplay.value.length);
const inputPlaceholer = computed(() => {
  if (!isInputFocused.value) return;
  if (!optionSelected.value) return;
  return getOptionName(optionSelected.value);
});
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
  if (props.isLoading) return 'Cargando...';
  if (isOptionsEmpty.value) return props.emptyOptionsMsg;
  return props.placeholder;
});
const isDisplayingPlaceholder = computed(
  () => ((isOptionsEmpty.value || isDefaultValue.value) && !inputValue.value && finalPlaceholder.value) || props.isLoading,
);
const isDisplayingClearBtn = computed(() => {
  if (isDisabled.value) return false;
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
  // clearable
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

watch(() => optionSelected.value, () => setInputValue());
watch(() => optionsToDisplayLength.value, (val) => {
  if (indexSelected.value === -1) return;
  if (indexSelected.value + 1 <= val) return;
  indexSelected.value = val - 1;
});
watch(() => dropdownRef.value, (val) => {
    if (!val) return;
    dropdownStyle.value = { display: 'none' };
    setTimeout(() => {
      const clientHeight = document.documentElement.clientHeight;
      const clientWidth = document.documentElement.clientWidth;
      const inputRect = inputRef.value.getBoundingClientRect();
      const styles: CSSProperties = {};
      // open below
      const openBelow = inputRect.top < clientHeight / 2;
      if (openBelow) {
        styles['top'] = `${inputRect.bottom}px`;
      } else {
        styles['bottom'] = `${clientHeight - inputRect.top}px`;
      }
      styles['left'] = `${inputRect.left}px`;
      styles['right'] = `${clientWidth - inputRect.right}px`;
      const maxHeightMargin = 100;
      styles['max-height'] = openBelow
        ? `${clientHeight - inputRect.top - maxHeightMargin}px`
        : `${inputRect.bottom - maxHeightMargin}px`;
      styles['display'] = 'block';
      dropdownStyle.value = styles;
    }, 150);
  });

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
function focus() {
  selectRef.value?.focus();
  inputRef.value?.focus();
}
function blur() {
  selectRef.value?.blur();
  inputRef.value?.blur();
}
function handleInputFocus() {
  inputValue.value = '';
  forceToDisplayAllOptions.value = true;
  setIindexSelected();
  isInputFocused.value = true;
}
function handleInputBlur() {
  setInputValue();
  isInputFocused.value = false;
}
function handleInputInput() {
  forceToDisplayAllOptions.value = false;
}
function handleInputKeydown(key: string) {
  const optionsLength = optionsToDisplayLength.value;
  if (key === 'ArrowDown') {
    indexSelected.value = indexSelected.value + 1 >= optionsLength ? 0 : indexSelected.value + 1;
  } else if (key === 'ArrowUp') {
    indexSelected.value = indexSelected.value <= 0 ? optionsLength - 1 : indexSelected.value - 1;
  } else if (key === 'Enter') {
    const index = indexSelected.value >= 0 ? indexSelected.value : 0;
    setValueSelected(getOptionValue(optionsToDisplay.value[index]));
    blur();
  }
}
function setValueSelected(newVal: OptionValue) {
  valueSelected.value = newVal;
  emit('change', newVal);
}
function setInputValue() {
  const optionSelectedValue = optionSelected.value;
  inputValue.value = optionSelectedValue ? getOptionName(optionSelectedValue) : '';
}
function setClearValue() {
  inputValue.value = '';
  setValueSelected(realClearValue.value);
}
function setIindexSelected() {
  if (optionSelected.value) {
    const options = optionsToDisplay.value;
    indexSelected.value = options.findIndex((op) => getOptionValue(op) === getOptionValue(optionSelected.value));
  } else {
    indexSelected.value = -1;
  }
}

useScrollListener(inputRef, () => inputRef.value?.blur());

// init component
setInputValue();
</script>

<template>
  <div class="ck-select" :class="selectContainerClass" :style="selectContainerStyle">
    <!-- label -->
    <ck-label v-if="label" :align="labelAlign" for="ck-select">
      {{ label }} <span v-if="optional" class="ck-select--optional-label">opcional</span>
    </ck-label>
    <!-- select -->
    <select
      v-if="isDisplayingSelect"
      ref="selectRef"
      v-model="valueSelected"
      id="ck-select"
      :class="selectClass"
      :style="selectStyle"
      :disabled="isDisabled"
      @change="emit('change', valueSelected)"
      @click="emit('click', $event)"
    >
      <!-- option -->
      <option v-for="option in options" :value="getOptionValue(option)" :key="option" :style="optionStyle">
        {{ getOptionName(option) }}
      </option>
    </select>
    <!-- input -->
    <input
      v-else
      ref="inputRef"
      v-model="inputValue"
      id="ck-select"
      :class="selectClass"
      :style="selectStyle"
      :placeholder="inputPlaceholer"
      :disabled="isDisabled"
      @click="emit('click', $event)"
      @focus="handleInputFocus()"
      @blur="handleInputBlur()"
      @input="handleInputInput()"
      @keydown="handleInputKeydown($event.key)"
    />
    <!-- dropdown -->
    <teleport to="body">
      <ul v-if="isInputFocused && optionsToDisplay.length" ref="dropdownRef" class="ck-input-dropdown" :style="dropdownStyle">
        <li
          v-for="(option, optionIndex) in optionsToDisplay"
          :key="getOptionValue(option)"
          class="dropdown--option"
          :class="{
            'dropdown--option__selected': getOptionValue(option) === valueSelected,
            'dropdown--option__index-selected': optionIndex === indexSelected,
          }"
          @mousedown="setValueSelected(getOptionValue(option))"
          @mouseenter="indexSelected = optionIndex"
        >
          {{ getOptionName(option) }}
        </li>
      </ul>
    </teleport>
    <!-- placeholder -->
    <span v-if="isDisplayingPlaceholder" class="ck-select--placeholder" v-text="finalPlaceholder" />
    <!-- icon left -->
    <ck-icon v-if="icon" class="ck-select--icon-left" :icon="icon" :icon-pack="iconPack" :color="iconColor" />
    <!-- icon right -->
    <ck-icon v-if="iconRight" class="ck-select--icon-right" :icon="iconRight" :icon-pack="iconPack" :color="iconColor" />
    <!-- clear btn -->
    <ck-button v-if="isDisplayingClearBtn" class="ck-select--btn" size="s" icon="times" type="flat" @click="setClearValue()" />
    <!-- chevron down btn -->
    <ck-button
      v-else-if="!isDisabled"
      class="ck-select--btn"
      :style="{ 'pointer-events': 'none' }"
      size="s"
      icon="chevron-down"
      type="flat"
    />
  </div>
</template>

<style lang="stylus" scoped>
$border-width = 1px
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
    appearance none
    -webkit-appearance none
    -moz-appearance none
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
  input
    cursor default
    font-size $globalFontSize
    box-sizing border-box
    min-height 40px
    width 100%
    padding $globalPadding
    border-radius $globalBorderRadius
    border $border-width solid $globalBorderColor
    &.rounded
      border-radius 10rem
    &.squared
      border-radius 0
    &.clearable
      padding-right 2rem
    &:focus
      border-color var(--primary)
      border-radius-bottom(1px)
      outline 0
    &:disabled
      input-disabled()
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
  .ck-select--btn
    cursor pointer
    position absolute
    right 0.5rem
    bottom 7.5px
    height 25px
    width @height
    border-radius 5px
    color #666
    flex-center()
    transition 0.3s
    &.inside-input
      right 0.25rem
    &:hover
      background-color rgba(black, 0.025)
  &.has-icon-left
    select
    input
      padding-left 14px + 3 * $globalPadding
    .ck-select--placeholder
      padding-left 28px
  &.has-icon-right
    select
    input
      padding-right 14px + 3 * $globalPadding
    .ck-select--placeholder
      padding-right 28px
</style>

<style lang="stylus">
.ck-input-dropdown
  list-style-type none
  position fixed
  z-index 99999
  padding 0
  border 1px solid rgba(black, 0.3)
  border-radius 0.25rem
  margin 0
  overflow auto
  background-color white
  ck-box-shadow()
  .dropdown--option
    padding 0.25em
    &__index-selected
      background-color rgba(200, 200, 200, 0.5)
    &__selected
      background-color rgba(173, 216, 230, 0.8)
</style>
