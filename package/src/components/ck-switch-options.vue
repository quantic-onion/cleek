<template lang="pug">
.ck-switch-options__container-exterior
  ck-label(v-if="label" :align="labelAlign") {{ label }}
  .ck-switch-options__container(:class="computedClass")
    .ck-switch-options__option(
    v-for="(Option, index) in options"
    :key="`ck-switch-options${index}`"
    :class="{ selected: selectedOption == getOptionValue(Option)}"
    :style="computedItemStyle"
    @click="selectedOption = getOptionValue(Option)"
    ) {{ Option[prop] }}
</template>

<script>
import { ckLabel } from './index';

export default {
  components: {
    ckLabel,
  },
  props: {
    modelValue: { type: [Boolean, Number, Object], default: 0 },
    options: { type: Array, required: true },
    // reduce functions
    prop: { type: String, default: 'name' },
    notReduce: { type: Boolean, default: false },
    reduceFunction: { type: Function, default: Option => Option.id },
    // label
    label: { type: String, default: '' },
    labelAlign: { type: String, default: 'center' },
    // group
    group: { type: String, default: '' }, // check
    // style
    sameWidthOptions: { type: Boolean, default: false },
  }, // props
  emits: ['update:modelValue', 'change'],
  computed: {
    selectedOption: {
      get() { return this.modelValue; },
      set(val) {
        this.$emit('update:modelValue', val);
        this.$emit('change', val);
      },
    },
    computedClass() {
      return {
        'group-top': this.group === 'top',
        'group-bottom': this.group === 'bottom',
      };
    },
    computedItemStyle() {
      const list = [];
      if (this.sameWidthOptions) list.push({ width: `${100 / this.options.length}%` });
      return list;
    },
  }, // computed
  methods: {
    getOptionValue(Option) {
      if (this.notReduce) return Option;
      return this.reduceFunction(Option);
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
@require '../styles/ck-styles'

$borderWidth = 2px
$borderRadius = 5px
$borderColor = rgba($primary, .45)
.ck-switch-options__container
  overflow hidden
  border $borderWidth solid $borderColor
  border-radius $borderRadius
  width 100%
  display flex
  align-items stretch
  flex-wrap wrap
  .ck-switch-options__option
    border-right $borderWidth solid $borderColor
    display inline-flex
    justify-content center
    align-items center
    text-align center
    my-box-shadow()
    background-color white
    border-radius 0
    text-align center
    font-weight 500
    color #9097A1
    // padding 7px
    padding 5px 15px
    cursor pointer
    transition transform .2s /* Animation */
    flex-grow 1
    // margin-bottom $borderWidth
    &:first-of-type
      border-top-left-radius $borderRadius
      border-bottom-left-radius $borderRadius
    &:last-of-type
      border-right 0
      border-top-right-radius $borderRadius
      border-bottom-right-radius $borderRadius
    &:hover
      opacity 0.9
    &.selected
      background-color $primary
      color white
// group
.group-top
  &.ck-switch-options__container
    border-radius ($borderRadius+2px) ($borderRadius+2px) 0 0
  .ck-switch-options__option
    border-radius 0 !important
.group-bottom
  &.ck-switch-options__container
    border-top 0
    border-radius 0 0 ($borderRadius+2px) ($borderRadius+2px)
  .ck-switch-options__option
    border-radius 0 !important

</style>
