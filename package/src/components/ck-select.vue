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

<script setup lang="ts">
import { ref, computed } from 'vue';
import functions from '../utils/functions.ts';
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
import qm from '../../node_modules/quantic-methods/dist/quantic-methods.es.ts';
const { qmStr } = qm;
import useWindowWidth from '../hooks/windowWidth';

const { windowWidth } = useWindowWidth(); 

defineExpose({
  setFocus,
});

const props = defineProps({
  modelValue: { default: null },
  prop: { type: String, default: undefined }, // SHOULD BE DELETED REPLACE BY reduceNameProp
  reduceValueProp: { type: String, default: 'id' },
  reduceNameProp: { type: String, default: 'name' }, // prop of the object showed in HTML
  autofocus: { type: Boolean, default: false }, // CHECK
  noDataText: { type: String, default: 'No se encontró nada' },
  notReduce: { type: Boolean, default: false }, // notReduce value & name
  notReduceValue: { type: Boolean, default: false },
  options: { type: Array, default: () => [] },
  reduceNameFunction: { type: Function, default: undefined }, // ej: (option) => option.name
  reduceValueFunction: { type: Function, default: undefined }, // ej: (option) => option.id
  notClearable: { type: Boolean, default: false },
  clearValue: { type: [Boolean, String], default: 'auto' },
  searchable: { type: [Boolean, String], default: 'auto' },
  minWidth: { type: String, default: '180px' },
  noBorder: { type: Boolean, default: false },
  bgTransparent: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  // group
  group: { type: String, default: '' },
  widthBreaks: { type: Array, default: undefined },
  groupVertical: { type: String, default: '' },
  // label
  label: { type: String, default: '' },
  labelAlign: { type: String, default: '' },
});
const emits = defineEmits(['update:modelValue', 'click', 'change']); // TERMINAR CLICK / CHANGE

const search = ref('');
const lastSelectedValue = ref(null);

const value = computed({
  get() { return props.modelValue; },
  set(val) {
    if (val === null) val = realClearValue;
    emits('update:modelValue', val);
  },
});
const filteredOptions = computed(() => {
  const list = props.options.filter((option) => {
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
  if (!isWidthDefined && props.minWidth) {
    list.push({ 'min-width': props.minWidth });
  }
  return list;
});
const realSearchable = computed(() => {
  if (props.searchable === 'auto') {
    if (props.options.length < 5) return false;
    return true;
  }
  return props.searchable;
});
const realClearValue = computed(() => {
  if (props.clearValue !== 'auto') return props.clearValue;
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
  if (props.clearValue !== 'auto') return value.value === props.clearValue;
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

function onBlur(event) {
  const isValid = checkOptionsIsValid(event.target.value);
  if (!isValid) event.target.value = lastSelectedValue.value;
  lastSelectedValue.value = null;
}
function onFocus(event) {
  lastSelectedValue.value = search.value;
  search.value = '';
}
function onClick(event) {
  emits('click', event);
}
function onChange(event) {
  emits('change', event);
  // const selected = props.options.find(i => getOptionName(i) === search.value);
  // value.value = getOptionValue(selected)
  // event.target.blur();
}
function checkOptionsIsValid(optionName) {
  if (!optionName) return false;
  return props.options.some(i => getOptionName(i) === optionName);
}
function getOptionValue(option) {
  if (props.reduceValueFunction) return props.reduceValueFunction(option);
  if (props.notReduceValue || props.notReduce) return option;
  return option[props.reduceValueProp];
}
function getOptionName(option) {
  if (props.reduceNameFunction) return props.reduceNameFunction(option);
  if (props.notReduce) return option;
  return option[props.prop || props.reduceNameProp];
}

function setFocus() {
  // const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
  // setTimeout(() => {
  //   el.focus();
  // }, 100);
}
</script>

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