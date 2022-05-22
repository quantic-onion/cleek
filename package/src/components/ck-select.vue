<script setup lang="ts">
import { ref, computed } from 'vue';
import { qmStr} from 'quantic-methods';
// components
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// hooks
import functions from '../utils/functions';
import useWindowWidth from '../hooks/windowWidth';

type SelectOption = any;

const props = defineProps<{
  modelValue: any;
  prop?: string; // SHOULD BE DELETED REPLACE BY reduceNameProp
  reduceValueProp?: string;
  reduceNameProp?: string; // prop of the object showed in HTML
  autofocus?: boolean; // CHECK
  notReduce?: boolean; // notReduce value & name
  notReduceValue?: boolean;
  options?: SelectOption[];
  reduceNameFunction?: (option: SelectOption) => string; // ej: (option) => option.name
  reduceValueFunction?: (option: SelectOption) => any; // ej: (option) => option.id
  notClearable?: boolean;
  clearValue?: boolean | string;
  searchable?: boolean | string;
  minWidth?: string;
  noBorder?: boolean;
  bgTransparent?: boolean;
  disabled?: boolean;
  // group
  group?: 'left' | 'right' | 'center';
  groupVertical?: 'top' | 'bottom' | 'center';
  widthBreaks?: [number, string][];
  // label
  label?: string;
  labelAlign?: 'left' | 'center' | 'right';
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'click', event: Event): void;
  (e: 'change', event: Event): void;
}>(); // TERMINAR CLICK / CHANGE

defineExpose({
  setFocus,
});

const defaultMinWidth = '180px';
const defaultClearValue = 'auto';
// const defaultSearchable = 'auto';
const defaultReduceNameProp = 'name';
const defaultReduceValueProp = 'id';

const { windowWidth } = useWindowWidth(); 
const search = ref('');
// const lastSelectedValue: Ref<null | string> = ref(null);

const value = computed({
  get() { return props.modelValue; },
  set(val) {
    if (val === null) val = realClearValue;
    emits('update:modelValue', val);
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
  list.push(functions.getGroupClass(props, windowWidth.value));
  // clear able
  if (isClearBtnVisible.value) list.push('clear-able')
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // width-break
  let isWidthDefined = false;
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value )
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
const realClearValue = computed(() => {
  const clearValue = props.clearValue || defaultClearValue;
  if (clearValue !== 'auto') return clearValue;
  switch (typeof props.modelValue) {
    case 'number': return 0;
    case 'string': return '';
    case 'object': // array is also object
      if (!props.modelValue) return null;
      if (props.modelValue.constructor === Array) return [];
      return {};
    default: return null;
  }
});
const valueIsDefault = computed(() => {
  const clearValue = props.clearValue || defaultClearValue;
  if (clearValue !== 'auto') return value.value === clearValue;
  switch (typeof props.modelValue) {
    case 'number': return props.modelValue === 0;
    case 'string': return props.modelValue === '';
    case 'object': // array is also object
      if (!props.modelValue) return null;
      if (props.modelValue.constructor === Array) {
        return props.modelValue.length === 0;
      }
      return Object.keys(props.modelValue).length === 0;
    default: return props.modelValue === null;
  }
});

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
function onChange(event: Event) {
  emits('change', event);
  // const selected = props.options.find(i => getOptionName(i) === search.value);
  // value.value = getOptionValue(selected)
  // event.target.blur();
}
// function checkOptionsIsValid(optionName) {
//   if (!optionName) return false;
//   return props.options.some(i => getOptionName(i) === optionName);
// }
function getOptionValue(option: SelectOption) {
  if (props.reduceValueFunction) return props.reduceValueFunction(option);
  if (props.notReduceValue || props.notReduce) return option;
  return option[props.reduceValueProp || defaultReduceValueProp];
}
function getOptionName(option: SelectOption) {
  if (props.reduceNameFunction) return props.reduceNameFunction(option);
  if (props.notReduce) return option;
  const reduceNameProp = props.reduceNameProp || defaultReduceNameProp;
  return option[props.prop || reduceNameProp];
}

function setFocus() {
  // const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
  // setTimeout(() => {
  //   el.focus();
  // }, 100);
}

functions.preventUnusedError([
  computedStyle,
  computedClassSelect,
  getOptionValue,
  onChange,
  onClick,
  filteredOptions,
]);
</script>

<template lang="pug">
.ck-select(
:style="computedStyle"
) 
  .ck-select__clear-btn(v-if="isClearBtnVisible" @click="value = realClearValue")
    ck-icon(icon="times")
  ck-label(v-if="label" :align="labelAlign" for="ck-input") {{ label }}
  //- input(
  //- v-model="search"
  //- )
  select(
  v-model="value"
  :class="computedClassSelect"
  :disabled="disabled"
  @click="onClick($event)"
  @change="onChange($event)"
  )
    option(
    v-for="option in filteredOptions"
    :value="getOptionValue(option)"
    :key="(option)"
    )
      | {{ getOptionName(option) }}
</template>

<style lang="stylus" scoped>
@import '../styles/.variables.styl';
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
    &.clear-able
      padding-right 2rem
    &:focus
      border-color var(--primary)
      outline 0
    option
      color #333
      font-size .9rem
      // cursor pointer // NOT WORKING
      // padding .25rem // NOT WORKING
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
    transition .3s
    &:hover
      background-color rgba(black, .025)
  // .ck-select__chevron-icon
  //   position absolute
  //   right 10px
  //   bottom 10px
</style>