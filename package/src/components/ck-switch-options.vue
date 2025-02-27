<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// components
import CkLabel from './ck-label.vue';
// hooks
import functions from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type { Align } from '../cleek-options/cleek-options.types';

type OptionValue = any;
type Option = any;

const valueSelected = defineModel<OptionValue>({ required: true });

const props = withDefaults(
  defineProps<{
    options?: Option[];
    useQuery?: boolean;
    queryName?: string;
    notReduce?: boolean;
    // reduce value
    reduceValueProp?: string;
    reduceValueMethod?: string;
    reduceValueFunction?: (option: Option) => OptionValue;
    notReduceValue?: boolean;
    // reduce name
    reduceNameProp?: string;
    reduceNameMethod?: string;
    reduceNameFunction?: (option: Option) => string;
    notReduceName?: boolean;
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
    reduceValueProp: 'id',
    reduceNameProp: 'name',
  },
);

const emit = defineEmits<{
  change: [val: OptionValue];
}>();

const route = useRoute();
const router = useRouter();
const { windowWidth } = useWindowWidth();
const defaultQueryName = 'q';

const isUsingQuery = computed(() => props.useQuery || !!props.queryName);
const finalQueryName = computed(() => props.queryName || defaultQueryName);
const optionsClass = computed(() => {
  const list = [];
  list.push(functions.getGroupClass(props, windowWidth.value));
  return list;
});
const optionStyle = computed(() => {
  const list = [];
  if (props.sameWidthOptions) list.push({ width: `${100 / (props.options || []).length}%` });
  return list;
});

function getOptionValue(option: Option) {
  if (props.reduceValueFunction) return props.reduceValueFunction(option);
  if (props.notReduceValue || props.notReduce) return option;
  if (props.reduceValueMethod) return option[props.reduceValueMethod]();
  return option[props.reduceValueProp];
}
function getOptionName(option: Option) {
  if (props.reduceNameFunction) return props.reduceNameFunction(option);
  if (props.notReduceName || props.notReduce) return option;
  if (props.reduceNameMethod) return option[props.reduceNameMethod]();
  return option[props.reduceNameProp];
}
function handleOptionClick(option: Option) {
  const value = getOptionValue(option);
  valueSelected.value = value;
  emit('change', value);
  if (isUsingQuery.value) router.push({ query: { [finalQueryName.value]: value } });
}
function initValueSelected() {
  if (!isUsingQuery.value) return;
  const queryValue = route.query[finalQueryName.value] as OptionValue;
  if (!queryValue) return;
  valueSelected.value = queryValue;
}

// init component
initValueSelected();
</script>

<template>
  <div class="ck-switch-options">
    <!-- label -->
    <ck-label v-if="label" :align="labelAlign">
      {{ label }}
    </ck-label>
    <!-- options -->
    <div class="switch-options--options" :class="optionsClass">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="options--option"
        :class="{ selected: getOptionValue(option) === valueSelected }"
        :style="optionStyle"
        @click="handleOptionClick(option)"
      >
        <ck-icon v-if="option.icon" class="option--icon" :icon="option.icon" />
        {{ getOptionName(option) }}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-switch-options
  $borderWidth = 2px
  $borderRadius = 5px
  $borderColor = var(--primary)
  // $borderColor = rgba(var(--primary), .45) FIXRGBA
  .switch-options--options
    overflow hidden
    border $borderWidth solid $borderColor
    border-radius $borderRadius
    width 100%
    display flex
    align-items stretch
    flex-wrap wrap
    min-height $globalMinHeight
    .options--option
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
      &:last-of-type
        border-right 0
      &:hover
        opacity 0.9
      &.selected
        background-color var(--primary)
        color white
      .option--icon
        margin-right 0.4rem
  // group
  .group-top
    &.switch-options--options
      border-radius-bottom 0
    .options--option
      border-radius 0 !important
  .group-bottom
    &.switch-options--options
      border-top 0
      border-radius-top 0
    .options--option
      border-radius 0 !important
</style>
