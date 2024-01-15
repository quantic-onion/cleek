<script setup lang="ts">
import { computed, ref } from 'vue';
import Datepicker from 'vue3-datepicker';
import { qmStr } from 'quantic-methods';
import type { Ref } from 'vue';
// hooks
import hooks from '../../utils/global-hooks';
import useWindowWidth from '../../hooks/windowWidth';
// types
import type { Align, AlignVertical, Color, Icon, WidthBreaks } from '../../types/cleek-options';
import type { IconPack } from '@fortawesome/fontawesome-svg-core';

type stringDate = null | string;

const props = defineProps<{
  modelValue: stringDate;
  label?: string;
  // icon
  icon?: Icon;
  iconRight?: Icon;
  iconPack?: IconPack;
  iconColor?: Color;
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
  get() {
    return convertToDate();
  },
  set(val: Date) {
    if (refFocusAbsorber.value) {
      refFocusAbsorber.value.style.display = 'block';
      refFocusAbsorber.value.focus();
      refFocusAbsorber.value.style.display = 'none';
    }
    emits('update:modelValue', dateToString(val));
  },
});

const isOnPopup = ref(false);
const computedClass = computed(() => {
  const classes = [];
  // group
  classes.push(hooks.getGroupClass(props, windowWidth.value));
  // icon
  if (props.icon) classes.push('has-icon-left');
  if (props.iconRight) classes.push('has-icon-right');
  // If the date picker is on a popup, we add a class to the container
  isOnPopup.value = document.querySelector('.ck-popup__content') ? true : false;
  if (isOnPopup.value) classes.push('ck-picker-popup');
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
function setOpenStatus() {
  const container = document.querySelector('.ck-input-date');
  const pickerPopupElement = document.querySelector('.ck-picker-popup');
  // const pickerCalendar = document.querySelector('.v3dp__popout-year');
  // const pickerCalendar = document.querySelector('.v3dp__popout-month');
  const pickerCalendar = document.querySelector('.v3dp__popout-day');
  let rect = { y: 0 };
  const popupContent = document.querySelector('.ck-popup__slot-body');
  if (popupContent instanceof HTMLElement) {
    popupContent.style.overflow = 'hidden';
  }
  if (container) {
    rect = container.getBoundingClientRect();
  }
  const bottomEdge = window.innerHeight - rect.y;
  if (pickerPopupElement && pickerCalendar) {
    pickerCalendar.setAttribute('style', `top: ${rect.y + 60}px;`);
    pickerPopupElement.setAttribute('style', `overflow: hidden;`);
  }
}

function setClosedStatus() {
  const popupContent = document.querySelector('.ck-popup__slot-body');
  if (popupContent instanceof HTMLElement) {
    popupContent.style.overflow = 'auto';
  }
}
</script>

<template>
  <ck-div :widthBreaks="widthBreaks">
    <div class="ck-input-date" :class="computedClass">
      <input ref="refFocusAbsorber" class="ck-input-date--focus-absorber" />
      <!-- label -->
      <ck-label>
        {{ label }}
      </ck-label>
      <div class="ck-picker-container">
        <!-- icon left -->
        <ck-icon
          v-if="icon"
          class="ck-input__icon-left"
          :color="iconColor ? iconColor : 'lightgrey'"
          :icon="icon"
          :icon-pack="iconPack"
        />
        <!-- typeable -->
        <Datepicker
          v-model="inputValue"
          @change="emits('change', inputValue)"
          @opened="setOpenStatus"
          @closed="setClosedStatus"
          inputFormat="dd-MM-yyyy"
        />
        <!-- icon right -->
        <ck-icon
          v-if="iconRight"
          class="ck-input__icon-right"
          :color="iconColor ? iconColor : 'lightgrey'"
          :icon="iconRight"
          :icon-pack="iconPack"
        />
      </div>
    </div>
  </ck-div>
</template>

<style lang="stylus" scoped>
@import '../../styles/index'
.ck-div
  min-width auto
  width auto
.ck-picker-container
  width 100%
  position relative
  > .ck-input__icon-left
  > .ck-input__icon-right
    position absolute
    bottom 13px
    z-index 1
  > .ck-input__icon-left
    left 1.5 * $globalPadding
  > .ck-input__icon-right
    right 1.5 * $globalPadding
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
  /deep/ .v3dp__popout
    position fixed
  &.ck-component__group--left
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-right 0
      border-radius-right 0
      border-right 0
  &.ck-component__group--right
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-left 0
  &.ck-component__group--center
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      border-radius-x 0
  &.has-icon-left
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      padding-left 14px + 3 * $globalPadding
  &.has-icon-right
    /deep/ .v3dp__datepicker .v3dp__input_wrapper input
      padding-right 14px + 3 * $globalPadding
</style>
