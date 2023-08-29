<script setup lang="ts">
import { computed, ref } from 'vue';
import Datepicker from 'vue3-datepicker';
import { qmStr } from 'quantic-methods';
import type { Ref } from 'vue';
// hooks
import hooks from '../../utils/global-hooks';
import useWindowWidth from '../../hooks/windowWidth';
// types
import type {
  Align,
  AlignVertical,
  WidthBreaks,
} from '../../types/cleek-options';

type stringDate = null | string;

const props = defineProps<{
  modelValue: stringDate;
  label?: string;
  // group
  widthBreaks?: WidthBreaks;
  group?: Align;
  groupVertical?: AlignVertical;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: stringDate): void;
  (e: 'change', modelValue: stringDate): void;
}>();

const { windowWidth } = useWindowWidth();
const refFocusAbsorber: Ref<HTMLInputElement | null> = ref(null);

const inputValue = computed({
  get() { return convertToDate(); },
  set(val: Date) {
    if (refFocusAbsorber.value) {
      refFocusAbsorber.value.style.display = 'block';
      refFocusAbsorber.value.focus();
      refFocusAbsorber.value.style.display = 'none';
    }
    emits('update:modelValue', dateToString(val));
  },
});
  
const computedClass = computed(() => {
  const classes = [];
  // group
  // @ts-ignore
  classes.push(hooks.getGroupClass(props, windowWidth.value));
  return classes;
});

// TODO move this to qmDate
function convertToDate() {
  if (!props.modelValue) return null;
  const justDate = `${props.modelValue}`.slice(0, 10);
  return new Date(`${justDate}T00:00:00`);
}
function dateToString(date: Date) {
  const year = date.getFullYear();
  const month = qmStr.padZeros(date.getMonth() + 1, 2);
  const day = qmStr.padZeros(date.getDate(), 2);
  return `${year}-${month}-${day}`;
}
</script>

<template lang="pug">
ck-div(:widthBreaks="widthBreaks")
  .ck-input-date(
  :class="computedClass"
  )
    input.ck-input-date--focus-absorber(ref="refFocusAbsorber")
    ck-label
      | {{ label }}
    //- typeable
    Datepicker(
    v-model="inputValue"
    inputFormat="dd-MM-yyyy"
    @change="emits('change', inputValue)"
    )
</template>

<style lang="stylus" scoped>
.ck-input-date--focus-absorber
  display none
.ck-input-date
  display inline-flex
  flex-wrap wrap
  width 100%
  /deep/ .v3dp__datepicker
    width 100%
    box-sizing border-box
    .v3dp__input_wrapper
      width 100%
      box-sizing border-box
      input
        width 100%
        padding-x 1rem
        min-height 40px
        border 1px solid rgb(218, 225, 231)
        box-sizing border-box
        border-radius 4px
  &.group--left
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-right 0
      border-right 0
  &.group--right
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-left 0
  &.group--center
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-x 0
</style>
