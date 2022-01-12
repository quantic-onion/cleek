<template lang="pug">
.ck-select(
:style="computedStyle"
)
  //- ck-label(v-if="label" :label-align="labelAlign") {{ label }}
  | select
  v-select.ck-select__v-select(
  ref="vSelect"
  v-model="value"
  :label="prop"
  :options="options"
  :disabled="!!disabled"
  :reduce="realReduceFunction"
  :clearable="!notClearable && !valueIsDefault"
  :searchable="realSearchable"
  )
    span(slot="no-options") {{ noDataText }}
</template>

<script>
console.log('vue coso');
import vSelect from 'vue-select';
// console.log('vue imported', vSelect);
import functions from '../utils/functions.ts';

// console.log('VueSelect', VueSelect);
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CkSelect',
  components: {
    vSelect,
  },
  props: {
    modelValue: { required: true, type: [Boolean, Number, Object, Array] },
    prop: { type: String, default: 'name' }, // prop of the object showed in HTML
    autofocus: { type: Boolean, default: false }, // CHECK
    noDataText: { type: String, default: 'No se encontró nada' },
    notReduce: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    reduceFunction: { type: Function, default: Option => Option.id },
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
  computed: {
    value: {
      get() { return this.modelValue; },
      set(val) {
        if (val === null) val = this.realClearValue;
        this.$emit('update:modelValue', val);
      },
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
          if (this.modelValue.constructor === Array) {
            return this.modelValue.length() === 0;
          }
          return Object.keys(this.modelValue).length === 0;
        default: return this.modelValue === null;
      }
    },
  }, // computed
  methods: {
    // reduceFunction
    // setFocus [ CALLED BY OUTSIDE ]

    realReduceFunction(Option) {
      if (this.notReduce) return Option;
      return this.reduceFunction(Option);
    },
    setFocus() {
      const el = this.$refs.vSelect.$el.children[0].children[0].children[1];
      setTimeout(() => {
        el.focus();
      }, 100);
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl';

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