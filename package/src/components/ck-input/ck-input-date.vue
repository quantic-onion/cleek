<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import Datepicker from 'vue3-datepicker';
import { qmStr } from 'quantic-methods';
// hooks
import hooks from '../../utils/global-hooks';
import useWindowWidth from '../../hooks/windowWidth';
// types
import type { Align, AlignVertical, CleekOptions, Color, Icon, WidthBreaks } from '../../types/cleek-options';
import type { IconPack } from '@fortawesome/fontawesome-svg-core';

type DateString = null | string;

const props = defineProps<{
  modelValue: DateString;
  label?: string;
  clearable?: boolean;
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

const emit = defineEmits<{
  'update:modelValue': [modelValue: DateString];
  change: [modelValue: DateString];
}>();

const { windowWidth } = useWindowWidth();
const cleekOptions = ref<CleekOptions>();
const refInput = ref<HTMLInputElement>();
const random = ref(Math.floor(Math.random() * 1000));
const isOnPopup = ref(false);
const uniqueId = ref(`ck-input-date-${random.value}`);

const inputValue = computed({
  get() {
    return convertToDate();
  },
  set(val: Date) {
    emit('update:modelValue', dateToString(val));
  },
});

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
const deepComputedStyles = computed(() => {
  const list = [];
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value?.popup.headerColor) backgroundColor = cleekOptions.value?.popup.headerColor;
  if (cleekOptions.value?.darkMode) backgroundColor = cleekOptions.value?.darkModeColorItems;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  return list;
});

watch(() => props.modelValue, (val) => {
  if (refInput.value) {
    refInput.value.style.display = 'block';
    refInput.value.focus();
    refInput.value.style.display = 'none';
  }
  emit('change', val);
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
  const uniquePicker = document.getElementById(`${uniqueId.value}`);
  const pickerCalendar = uniquePicker?.querySelector('.v3dp__popout-day');
  let rect = { y: 0 };
  const popupContent = document.querySelector('.ck-popup__slot-body');
  if (popupContent instanceof HTMLElement) {
    popupContent.style.overflow = 'hidden';
  }
  if (uniquePicker) {
    rect = uniquePicker.getBoundingClientRect();
  }
  const bottomEdge = window.innerHeight - rect.y;
  if (uniquePicker && pickerCalendar) {
    const containerHeight = 300;
    const spaceBelow = bottomEdge - containerHeight;
    if (spaceBelow < 0) {
      pickerCalendar.setAttribute('style', `bottom: 0px`);
    } else {
      pickerCalendar.setAttribute('style', `top: ${rect.y + 60}px;`);
    }
    uniquePicker.setAttribute('style', `overflow: hidden;`);
  }
}
function setClosedStatus() {
  const popupContent = document.querySelector('.ck-popup__slot-body');
  if (popupContent instanceof HTMLElement) {
    popupContent.style.overflow = 'auto';
  }
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <ck-div :widthBreaks="widthBreaks">
    <div class="ck-input-date" :class="computedClass" :id="uniqueId">
      <input ref="refInput" class="ck-input-date--focus-absorber" />
      <!-- label -->
      <ck-label> {{ label }} </ck-label>
      <div class="ck-picker-container" :class="cleekOptions?.darkMode && 'picker-dark'">
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
          @opened="setOpenStatus"
          @closed="setClosedStatus"
          inputFormat="dd-MM-yyyy"
          :style="deepComputedStyles"
          :clearable="clearable"
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
.ck-div
  min-width auto
  width auto
.ck-picker-container
  width 100%
  position relative
  .ck-input__icon-left
  .ck-input__icon-right
    position absolute
    bottom 13px
    z-index 1
  .ck-input__icon-left
    left 1.5 * $globalPadding
  .ck-input__icon-right
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
    .v3dp__element__button__day:hover span
      background var(--primary) !important
    .selected span
      background var(--primary) !important
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
.picker-dark
  /deep/ input
    color white !important
  /deep/ .v3dp__heading
    button:hover
      background $darkModeTableBgAlternativeColor
  /deep/ .v3dp__popout
    color white
    background-color $darkModeColorItems
    button:disabled
      color $darkModeTableBgAlternativeColor
</style>
