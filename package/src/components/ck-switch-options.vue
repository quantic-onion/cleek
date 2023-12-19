<script setup lang="ts">
import { computed } from 'vue';
// components
import CkLabel from './ck-label.vue';
// hooks
import functions from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';

type Option = boolean | number | object | string;

const defaultProp = 'name';
// @ts-ignore
const defaultReduceFunction = (option) => option.id;

const props = defineProps<{
  modelValue: Option;
  options?: Option[];
  // reduce functions
  prop?: string;
  notReduce?: boolean;
  reduceFunction?: (option: Option) => any;
  // label
  label?: string;
  labelAlign?: string;
  // group
  widthBreaks?: [number, string][];
  group?: 'left' | 'right' | 'center';
  groupVertical?: 'top' | 'bottom' | 'center';
  // style
  sameWidthOptions?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: Option): void;
  (e: 'change', value: Option): void;
}>();

const { windowWidth } = useWindowWidth();

const selectedOption = computed({
  get() {
    return props.modelValue;
  },
  set(val: Option) {
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
  if (props.sameWidthOptions) list.push({ width: `${100 / (props.options || []).length}%` });
  return list;
});

function getOptionValue(option: Option) {
  if (props.notReduce) return option;
  if (props.reduceFunction) {
    return props.reduceFunction(option);
  }
  return defaultReduceFunction(option);
}
</script>

<template>
<div class="ck-switch-options__container-exterior">
  <!-- label -->
  <ck-label v-if="label" :align="labelAlign">
    {{ label }}
  </ck-label>
  <!-- switch options -->
  <div class="ck-switch-options__container" :class="computedClass">
    <div
      v-for="(option, index) in options"
      class="ck-switch-options__option"
      :key="`ck-switch-options${index}`"
      :class="{ selected: selectedOption == getOptionValue(option) }"
      :style="computedItemStyle"
      @click="selectedOption = getOptionValue(option)"
    >
      {{ option[prop || defaultProp] }}
    </div>
  </div>
</div>
</template>

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
    transition transform 0.2s /* Animation */
    flex-grow 1
    transition 0.4s
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
