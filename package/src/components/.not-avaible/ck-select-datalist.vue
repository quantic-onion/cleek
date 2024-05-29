<script setup lang="ts">
import { ref, computed } from 'vue';
import { qmStr } from 'quantic-methods';
import functions from '../utils/global-hooks.ts';
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// name: 'CkSelect',
// methods called by outside: setFocus
const props = defineProps({
  modelValue: { default: null, type: [Boolean, Number, Object, Array] },
  prop: { type: String, default: 'name' }, // prop of the object showed in HTML
  autofocus: { type: Boolean, default: false }, // CHECK
  noDataText: { type: String, default: 'No se encontró nada' },
  notReduce: { type: Boolean, default: false },
  options: { type: Array, default: () => [] },
  reduceFunction: { type: Function, default: (Option) => Option.id },
  notClearable: { type: Boolean, default: false },
  clearValue: { type: [Boolean, String], default: 'auto' },
  searchable: { type: [Boolean, String], default: 'auto' },
  minWidth: { type: String, default: '180px' }, // min-width in px
  noBorder: { type: Boolean, default: false },
  bgTransparent: { type: Boolean, default: false },
  disabled: { type: [Boolean, Number], default: false },
  // group
  group: { type: String, default: '' },
  groupBreak: { type: String, default: '' },
  groupVertical: { type: String, default: '' },
  // label
  label: { type: String, default: '' },
  labelAlign: { type: String, default: '' },
});
const emits = defineEmits(['update:modelValue', 'click', 'change']); // TERMINAR CLICK / CHANGE

const search = ref('');
const lastSelectedValue = ref(null);

const value = computed({
  get() {
    return props.modelValue;
  },
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
const computedClass = computed(() => {
  const classList = [];
  // group
  classList.push(functions.getGroupClass(this));
  return classList;
});
const computedStyle = computed(() => {
  const list = [];
  if (props.minWidth) list.push({ 'min-width': props.minWidth });
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
  switch (typeof props.modelValue) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'object': // array is also object
      if (props.modelValue.constructor === Array) return [];
      return {};
    default:
      return null;
  }
});
const valueIsDefault = computed(() => {
  switch (typeof props.modelValue) {
    case 'number':
      return props.modelValue === 0;
    case 'string':
      return props.modelValue === '';
    case 'object': // array is also object
      if (!props.modelValue) return null;
      if (props.modelValue.constructor === Array) {
        return props.modelValue.length() === 0;
      }
      return Object.keys(props.modelValue).length === 0;
    default:
      return props.modelValue === null;
  }
});

const onBlur = (event) => {
  const isValid = checkOptionsIsValid(event.target.value);
  if (!isValid) event.target.value = lastSelectedValue.value;
  lastSelectedValue.value = null;
};
const onFocus = (event) => {
  lastSelectedValue.value = search.value;
  search.value = '';
};
const onChangeOption = (event) => {
  const selected = props.options.find((i) => getOptionName(i) === search.value);
  value.value = getOptionKey(selected);
  event.target.blur();
};
const checkOptionsIsValid = (optionName) => {
  if (!optionName) return;
  return props.options.some((i) => getOptionName(i) === optionName);
};
const getOptionKey = (option) => {
  return realReduceFunction(option);
};
const getOptionName = (option) => {
  if (!props.prop) return option;
  return option[props.prop];
};
const realReduceFunction = (option) => {
  if (props.notReduce) return option;
  return props.reduceFunction(option);
};

const setFocus = () => {
  // const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
  // setTimeout(() => {
  //   el.focus();
  // }, 100);
};
</script>

<template lang="pug">
form.ck-select(action="/action_page.php" method="get")
  //- label
  ck-label(v-if="label" :align="labelAlign" for="ck-select") {{ label }}
  //- chevron
  //- ck-icon.ck-select__chevron-icon(v-if="" icon="chevron-down")
  input(
    autocomplete="off"
    list="ck-select__list"
    name="ck-select"
    v-model="search"
    :id="label ? 'ck-select' : ''"
    :placeholder="lastSelectedValue"
    :class="computedClass"
    @focus="onFocus($event)"
    @blur="onBlur($event)"
    @change="onChangeOption($event)"
  )
  datalist#ck-select__list
    option(@click="onClickOption(option)" :key="getOptionKey(option)" :value="getOptionName(option)" v-for="option in options")
</template>

<style lang="stylus" scoped>
.ck-select
  display inline-block
  position relative
  input
    border 1px solid $globalBorderColor
    height $globalMinHeight
    border-radius $globalBorderRadius
    font-size $globalFontSize
    padding $globalPadding
    box-sizing border-box
    &:focus
      border-color var(--primary)
      outline 0
  .ck-select__chevron-icon
    position absolute
    right 10px
    bottom 10px
// .ck-select
//   display inline-flex
//   flex-wrap wrap
//   > .ck-select__v-select
//     width 100%
//     /deep/ .vs__dropdown-toggle
//       border-radius $globalBorderRadius
//       border 1px solid $globalBorderColor
//       height 40px
//       background-color white
</style>
