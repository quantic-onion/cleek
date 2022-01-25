<template lang="pug">
//- .ck-select(
//- :style="computedStyle"
//- ) 
//-   input(
//-   v-model="search"
//-   )
//-   select(
//-   v-model="value"
//-   )
//-     option(
//-     v-for="option in filteredOptions"
//-     :value="getOptionKey(option)"
//-     :key="getOptionKey(option)"
//-     )
//-       | {{ getOptionName(option) }}


form.ck-select(action="/action_page.php" method="get")
  //- label
  ck-label(v-if="label" :align="labelAlign" for="ck-select") {{ label }}
  input(
    list="ck-select__list"
    name="ck-select"
    id="ck-select"
    :placeholder="lastSelectedValue"
    :class="computedClass"
    @focus="onFocus($event)"
    @blur="onBlur($event)"
  )
  datalist(id="ck-select__list")
    option(:value="option.name" v-for="option in options")
</template>

<script>
import functions from '../utils/functions.ts';
import ckLabel from './ck-label.vue';
// import { qmStr } from 'quantic-methods';
import { qmStr } from '../../node_modules/quantic-methods/dist/quantic-methods.es.ts';

export default {
  name: 'CkSelect',
  components: {
    ckLabel,
  },
  props: {
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
  },
  emits: ['update:modelValue'],
  data() {
    return {
      search: '',
      lastSelectedValue: null,
    }; // return data
  }, // data
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) {
        if (val === null) val = this.realClearValue;
        this.$emit('update:modelValue', val);
      },
    },
    filteredOptions() {
      return this.options.filter((option) => {
        const name = this.getOptionName(option);
        return qmStr.checkContainsStr(name, this.search);
      });
    },
    computedClass() {
      const classList = [];
      // group
      classList.push(functions.getGroupClass(this));
      return classList;
    },
    computedStyle() {
      const list = [];
      if (this.minWidth) list.push({ 'min-width': this.minWidth });
      return list;
    },
    realSearchable() {
      if (this.searchable === 'auto') {
        if (this.options.length < 5) return false;
        return true;
      }
      return this.searchable;
    },
    realClearValue() {
      switch (typeof this.modelValue) {
        case 'number': return 0;
        case 'string': return '';
        case 'object': // array is also object
          if (this.modelValue.constructor === Array) return [];
          return {};
        default: return null;
      }
    },
    valueIsDefault() {
      switch (typeof this.modelValue) {
        case 'number': return this.modelValue === 0;
        case 'string': return this.modelValue === '';
        case 'object': // array is also object
          if (!this.modelValue) return null;
          if (this.modelValue.constructor === Array) {
            return this.modelValue.length() === 0;
          }
          return Object.keys(this.modelValue).length === 0;
        default: return this.modelValue === null;
      }
    },
  }, // computed
  methods: {
    // onBlur
    // onFocus
    // checkOptionsIsValid
    // getOptionKey
    // getOptionName
    // reduceFunction
    // setFocus [ CALLED BY OUTSIDE ]

    onBlur(event) {
      const isValid = this.checkOptionsIsValid(event.target.value)
      if (!isValid) event.target.value = this.lastSelectedValue;
      this.lastSelectedValue = null;
    },
    onFocus(event) {
      this.lastSelectedValue = event.target.value;
      event.target.value = '';
    },
    checkOptionsIsValid(optionName) {
      if (!optionName) return;
      return this.options.some(i => this.getOptionName(i) === optionName);
    },
    getOptionKey(option) {
      return this.realReduceFunction(option);
    },
    getOptionName(option) {
      if (!this.prop) return option;
      return option[this.prop];
    },
    realReduceFunction(option) {
      if (this.notReduce) return option;
      return this.reduceFunction(option);
    },
    setFocus() {
      // const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
      // setTimeout(() => {
      //   el.focus();
      // }, 100);
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl';

.ck-select
  display inline-block
  input
    border 1px solid $globalBorderColor
    height $globalMinHeight
    border-radius $globalBorderRadius
    font-size $globalFontSize
    padding $globalPadding
    box-sizing border-box
    &:focus
      border-color $color-primary
      outline 0

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