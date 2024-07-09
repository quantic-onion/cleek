<script setup lang="ts">
import { computed, watch } from 'vue';
// components
import CkLabel from './ck-label.vue';
// hooks
import functions from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type { Align } from '../types/cleek-options';

type Option = boolean | number | object | string;

const selectedOption = defineModel<Option>({ required: true });

const props = withDefaults(
  defineProps<{
    options?: Option[];
    // reduce functions
    prop?: string;
    notReduce?: boolean;
    reduceFunction?: (option: Option) => any;
    // label
    label?: string;
    labelAlign?: Align;
    // group
    widthBreaks?: [number, string][];
    group?: 'left' | 'right' | 'center';
    groupVertical?: 'top' | 'bottom' | 'center';
    // style
    sameWidthOptions?: boolean;
  }>(),
  {
    prop: 'name',
  },
);

const emit = defineEmits<{
  change: [value: Option];
}>();

const { windowWidth } = useWindowWidth();

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

watch(selectedOption, (val) => emit('change', val));

function defaultReduceFunction(option) {
  return option.id;
}
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
        {{ option[prop] }}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
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
    padding 5px 15px
    flex-grow 1
    transition transform 0.2s
    &:hover
      cursor pointer
      // background-color rgba(var(--primary), .1) FIXRGBA
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
