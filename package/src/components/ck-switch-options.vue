<template lang="pug">
.ck-switch-options__container-exterior
  //- label
  ck-label(v-if="label" :align="labelAlign") {{ label }}
  //- switch options
  .ck-switch-options__container(:class="computedClass")
    .ck-switch-options__option(
    v-for="(Option, index) in options"
    :key="`ck-switch-options${index}`"
    :class="{ selected: selectedOption == getOptionValue(Option)}"
    :style="computedItemStyle"
    @click="selectedOption = getOptionValue(Option)"
    )
      | {{ Option[prop] }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import functions from '../utils/functions.ts';
import ckLabel from './ck-label.vue';
import useWindowWidth from '../hooks/windowWidth';

const { windowWidth } = useWindowWidth(); 

const props = defineProps({
  modelValue: { type: [Boolean, Number, Object], default: 0 },
  options: { type: Array, required: true },
  // reduce functions
  prop: { type: String, default: 'name' },
  notReduce: { type: Boolean, default: false },
  reduceFunction: { type: Function, default: Option => Option.id },
  // label
  label: { type: String, default: '' },
  labelAlign: { type: String, default: '' },
  // group
  group: { type: String, default: '' },
  widthBreaks: { type: Array, default: undefined },
  groupVertical: { type: String, default: '' },
  // style
  sameWidthOptions: { type: Boolean, default: false },
});

const emits = defineEmits(['update:modelValue', 'change']);

const selectedOption = computed({
  get() { return props.modelValue; },
  set(val) {
    emits('update:modelValue', val);
    emits('change', val);
  },
});
const computedClass = computed(() => {
  const list = [];
  // group
  list.push(functions.getGroupClass(props, windowWidth.value));
  return list;
});
const computedItemStyle = computed(() => {
  const list = [];
  if (props.sameWidthOptions) list.push({ width: `${100 / props.options.length}%` });
  return list;
});

function getOptionValue(Option) {
  if (props.notReduce) return Option;
  return props.reduceFunction(Option);
}
</script>

<style lang="stylus" scoped>
@require '../styles/index'

$borderWidth = 2px
$borderRadius = 5px
$borderColor = var(--primary)
// $borderColor = rgba(var(--primary), .45) FIXRGBA
.ck-switch-options__container
  overflow hidden
  border $borderWidth solid $borderColor
  border-radius $borderRadius
  width 100%
  display flex
  align-items stretch
  flex-wrap wrap
  min-height $globalMinHeight
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
    color #666
    // padding 7px
    padding 5px 15px
    cursor pointer
    transition transform .2s /* Animation */
    flex-grow 1
    transition .4s
    &:hover
      // background-color rgba(var(--primary), .1) FIXRGBA
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
      background-color var(--primary)
      color white
// group
.group-top
  &.ck-switch-options__container
    border-radius-bottom 0
  .ck-switch-options__option
    border-radius 0 !important
.group-bottom
  &.ck-switch-options__container
    border-top 0
    border-radius-top 0
  .ck-switch-options__option
    border-radius 0 !important

</style>
