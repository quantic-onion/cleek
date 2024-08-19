<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { qmStr } from 'quantic-methods';
// components
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/window-width';
// types
import type { Align, AlignVertical, Color, CleekOptions, Icon, IconPack, Layout, WidthBreaks } from '../types/cleek-options';

type SelectOption = any;

const props = defineProps<{
  modelValue: any;
  prop?: string; // SHOULD BE DELETED REPLACE BY reduceNameProp
  reduceValueProp?: string;
  reduceValueMethod?: string;
  reduceNameProp?: string; // prop of the object showed in HTML
  reduceNameMethod?: string; // method of the object showed in HTML
  autofocus?: boolean; // CHECK
  notReduce?: boolean; // notReduce value & name
  notReduceValue?: boolean;
  options?: SelectOption[];
  reduceNameFunction?: (option: SelectOption) => string; // ej: (option) => option.name
  reduceValueFunction?: (option: SelectOption) => any; // ej: (option) => option.id
  notClearable?: boolean;
  clearValue?: any;
  searchable?: boolean | string; // TODO
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
  // placeholder
  placeholder?: string;
  emptyOptionsMsg?: string;
  backgroundColor?: Color;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'click', event: Event): void;
  (e: 'change', event?: Event): void;
}>(); // TERMINAR CLICK / CHANGE

defineExpose({
  setFocus,
});

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const defaultMinWidth = '180px';
const defaultClearValue = 'auto';
// const defaultSearchable = 'auto';
const defaultReduceNameProp = 'name';
const defaultReduceValueProp = 'id';
const defaultBackgroundColor = 'unset'; // move to default file

const { windowWidth } = useWindowWidth();
const search = ref('');
// const lastSelectedValue: Ref<null | string> = ref(null);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    // if (val === null) val = realClearValue;
    emits('update:modelValue', val);
    emits('change');
  },
});
const filteredOptions = computed(() => {
  const options = props.options || [];
  const list = options.filter((option) => {
    const name = getOptionName(option);
    return qmStr.checkContainsStr(name, search.value);
  });
  return list;
  // const noResultMsg = 'No se encuentra resultados'
  // if (list.length) return list;
  // if (props.notReduce) return [noResultMsg];
  // return [{ [props.prop]: noResultMsg }]
});
const isClearBtnVisible = computed(() => {
  if (props.notClearable) return false;
  if (valueIsDefault.value) return false;
  // const existeesaopcion = props.options.some((option) => (
  //   getOptionValue(option) === realClearValue
  // ));
  // if (!existeesaopcion) return false;
  return true;
});
const computedClassSelect = computed(() => {
  const list = [];
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(layout);
  // clear able
  if (isClearBtnVisible.value) list.push('clear-able');
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  return list;
});
const computedStyleSelect = computed(() => {
  const list = [];
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value?.select.backgroundColor) backgroundColor = cleekOptions.value?.select.backgroundColor;
  if (cleekOptions.value?.darkMode) backgroundColor = cleekOptions.value?.darkModeColorItems;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
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
const computedStyleOption = computed(() => {
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
  const minWidth = props.minWidth || defaultMinWidth;
  if (!isWidthDefined && minWidth) {
    list.push({ 'min-width': minWidth });
  }
  // width
  if (props.width) list.push({ width: props.width });
  return list;
});
// const realSearchable = computed(() => {
//   const searchable = props.searchable || defaultSearchable;
//   if (searchable === 'auto') {
//     if (props.options.length < 5) return false;
//     return true;
//   }
//   return searchable;
// });
const logicClearValue = computed(() => {
  if (typeof props.clearValue !== 'undefined') return props.clearValue;
  if (typeof cleekOptions.value?.select?.clearValue !== 'undefined') return cleekOptions.value.select.clearValue;
  return defaultClearValue;
});
const realClearValue = computed(() => {
  if (logicClearValue.value !== 'auto') return logicClearValue.value;
  switch (typeof props.modelValue) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'object': // array is also object
      if (!props.modelValue) return null;
      if (props.modelValue.constructor === Array) return [];
      return {};
    default:
      return null;
  }
});
const valueIsDefault = computed(() => {
  if (logicClearValue.value !== 'auto') return value.value === logicClearValue.value;
  const currentValue = props.modelValue;
  if (typeof currentValue === 'number') return currentValue === 0;
  if (typeof currentValue === 'string') return currentValue === '';
  if (typeof currentValue === 'object') {
    if (!currentValue) return currentValue === null;
    // array is also object
    if (Array.isArray(currentValue)) return currentValue.length === 0;
    return Object.keys(currentValue).length === 0;
  }
  return currentValue === null;
});
const isPlaceholderVisible = computed(() => {
  if (!props.placeholder) return;
  return valueIsDefault.value;
});
const isOptionsListEmpty = computed(() => !filteredOptions.value.length);
const isEmptyOptionsMsgVisible = computed(() => isOptionsListEmpty.value);

// function onBlur(event: Event) {
//   const isValid = checkOptionsIsValid(event.target.value);
//   if (!isValid) event.target.value = lastSelectedValue.value;
//   lastSelectedValue.value = null;
// }
// function onFocus(event: Event) {
//   lastSelectedValue.value = search.value;
//   search.value = '';
//   emits('focus', event);
// }
function onClick(event: Event) {
  emits('click', event);
}
// function checkOptionsIsValid(optionName) {
//   if (!optionName) return false;
//   return props.options.some(i => getOptionName(i) === optionName);
// }
function getOptionValue(option: SelectOption) {
  if (props.reduceValueFunction) return props.reduceValueFunction(option);
  if (props.notReduceValue || props.notReduce) return option;
  if (props.reduceValueMethod) return option[props.reduceValueMethod]();
  return option[props.reduceValueProp || defaultReduceValueProp];
}
function getOptionName(option: SelectOption) {
  if (props.reduceNameFunction) return props.reduceNameFunction(option);
  if (props.notReduce) return option;
  if (props.reduceNameMethod) return option[props.reduceNameMethod]();
  const reduceNameProp = props.reduceNameProp || defaultReduceNameProp;
  return option[props.prop || reduceNameProp];
}
function setClearValue() {
  value.value = realClearValue.value;
}
function setFocus() {
  // const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
  // setTimeout(() => {
  //   el.focus();
  // }, 100);
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
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
    <ck-label v-if="label" :align="labelAlign" for="ck-input">
      {{ label }}
    </ck-label>
    <!-- select -->
    <select
      v-model="value"
      :class="computedClassSelect"
      :style="computedStyleSelect"
      :disabled="disabled || isOptionsListEmpty"
      @click="onClick($event)"
    >
      <!-- option -->
      <option
        v-for="option in filteredOptions"
        :value="getOptionValue(option)"
        :key="option"
        :style="computedStyleOption"
      >
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
    margin-bottom ((40px - @height) / 2)
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
      padding-left 14px + (3 * $globalPadding)
    .ck-select--placeholder
      padding-left 28px
  &.has-icon-right
    select
      padding-right 14px + (3 * $globalPadding)
    .ck-select--placeholder
      padding-right 28px
  // .ck-select__chevron-icon
  //   position absolute
  //   right 10px
  //   bottom 10px
</style>
