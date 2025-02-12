<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { qmStr } from 'quantic-methods';
// stores
import { useCleekOptionsStore } from '@/cleek-options/cleek-options.store';
// components
import CkLabel from './ck-label.vue';
import CkIcon from './ck-icon.vue';
// hooks
import hooks from '../utils/global-hooks';
import useWindowWidth from '../hooks/windowWidth';
// types
import type {
  Align,
  AlignVertical,
  Color,
  Icon,
  IconPack,
  InputType,
  Layout,
  SizeInCSS,
  WidthBreaks,
} from '../cleek-options/cleek-options.types';

type Value = string | number;

const modelValue = defineModel<Value>({ required: true });

const props = withDefaults(
  defineProps<{
    type?: InputType;
    autocomplete?: boolean;
    disabled?: boolean;
    placeholder?: string;
    plusMinusButtons?: boolean;
    min?: number;
    max?: number;
    // label
    label?: string;
    labelAlign?: Align;
    // icon
    icon?: Icon;
    iconRight?: Icon;
    iconPack?: IconPack;
    iconColor?: Color;
    // group
    group?: Align;
    groupVertical?: AlignVertical;
    widthBreaks?: WidthBreaks;
    // style
    fontSize?: SizeInCSS;
    size?: 's' | 'm' | 'l' | 'xl';
    hideBorder?: boolean;
    width?: string;
    align?: Align;
    layout?: Layout;
    borderColor?: Color;
    textColor?: Color;
    optional?: boolean;
    // functions
    autofocus?: boolean;
    capitalize?: boolean;
    toUpperCase?: boolean;
    autoSelect?: boolean;
    delayChangeTime?: number;
    justInteger?: boolean;
  }>(),
  {
    type: 'text',
    // style
    size: 'm',
    // functions
    delayChangeTime: 300,
  },
);

const emit = defineEmits<{
  click: [event: Event];
  focus: [event: Event];
  blur: [event: Event];
  input: [value: Value];
  inputDelayed: [value: Value];
  change: [value: Value];
  changeDelayed: [value: Value];
}>();

defineExpose({ focus, select });

const { cleekOptions } = storeToRefs(useCleekOptionsStore());
const { windowWidth } = useWindowWidth();
const inputRef = ref<HTMLInputElement>();
const inputValue = ref<Value>('');
const isShowingPassword = ref(false);
const plusMinusButtonsDefaultWithInput = '120px';
const plusMinusButtonsDefaultAlign = 'center';

const finalJustInteger = computed(() => props.justInteger || props.plusMinusButtons);
const finalLabelAlign = computed(() => {
  if (props.labelAlign) return props.labelAlign;
  if (props.align) return props.align;
  if (props.plusMinusButtons) return plusMinusButtonsDefaultAlign;
  return 'left';
});
const computedStyle = computed(() => {
  const list = [];
  // width
  let width = '';
  if (props.width) width = props.width;
  if (props.plusMinusButtons) width = plusMinusButtonsDefaultWithInput;
  if (width) list.push({ width: width });
  // width-break
  if (props.widthBreaks) {
    const width = hooks.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value);
    if (width) list.push({ width });
  }
  return list;
});
const computedClassInput = computed(() => {
  const list = [];
  // group
  list.push(hooks.getGroupClass(props, windowWidth.value));
  // icon
  if (props.icon) list.push('has-icon-left');
  if (props.iconRight) list.push('has-icon-right');
  // align
  let align = props.align;
  if (props.plusMinusButtons) align = plusMinusButtonsDefaultAlign;
  if (align) list.push(`align--${align}`);
  // hideBorder
  if (props.hideBorder) list.push('no-border');
  // layout
  const layout = props.layout || cleekOptions.value.styles.layout;
  if (layout) list.push(layout);
  // size
  if (props.size) list.push(`ck-input-size__${props.size}`);
  // border-color
  const borderColor = props.borderColor || cleekOptions.value.styles.borderColor;
  if (borderColor && hooks.isColorTemplateVariable(borderColor)) {
    list.push(`ck-component__border-color--${borderColor}`);
  }
  return list;
});
const computedStyleInput = computed(() => {
  const list = [];
  // font-size
  if (props.fontSize) list.push({ 'font-size': props.fontSize });
  // font-size
  if (props.textColor) list.push({ color: props.textColor });
  // border-color
  const borderColor = props.borderColor || cleekOptions.value.styles.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value.darkMode) backgroundColor = cleekOptions.value.darkModeColorItems;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  // text-color
  let textColor = props.textColor || cleekOptions.value.popup.textColor;
  if (cleekOptions.value.darkMode) textColor = cleekOptions.value.darkModeColorText;
  if (textColor && !hooks.isColorTemplateVariable(textColor)) {
    list.push(`ck-component__color--${textColor}`);
    list.push({ color: textColor });
  }
  return list;
});

watch(
  () => modelValue.value,
  (val) => setValues(val),
  { immediate: true },
);

function focus() {
  inputRef.value?.focus();
}
function select() {
  inputRef.value?.select();
}
function emitInputs(val: Value) {
  emit('input', val);
  setTimeout(() => {
    if (modelValue.value !== val) return;
    emit('inputDelayed', val);
  }, props.delayChangeTime);
}
function emitChanges(val: Value) {
  emit('change', val);
  setTimeout(() => {
    if (modelValue.value !== val) return;
    emit('changeDelayed', val);
  }, props.delayChangeTime);
}
function handleInputClick(event: Event) {
  emit('click', event);
  if (props.autoSelect) inputRef.value?.select();
}
function handleInputInput() {
  const val = setValues(inputValue.value);
  emitInputs(val);
}
function handleInputChange() {
  emitChanges(modelValue.value);
}
function handleInputFocus($event: Event) {
  emit('focus', $event);
  if (props.type === 'number' && !inputValue.value) inputValue.value = '';
}
function handleInputBlur($event: Event) {
  emit('blur', $event);
  if (props.type === 'number' && !inputValue.value) inputValue.value = modelValue.value;
}
function handleMinusButtonClick() {
  const val = setValues(+inputValue.value - 1);
  emitInputs(val);
  emitChanges(val);
}
function handlePlusButtonClick() {
  const val = setValues(+inputValue.value + 1);
  emitInputs(val);
  emitChanges(val);
}
function getFinalModelValue(val: Value) {
  let finalValue = val;
  if (props.capitalize) finalValue = qmStr.capitalize(`${finalValue}`);
  if (props.toUpperCase) finalValue = `${finalValue}`.toUpperCase();
  if (finalJustInteger.value) finalValue = parseInt(`${+finalValue}`);
  if (typeof props.min !== 'undefined' && +finalValue < +props.min) finalValue = +props.min;
  if (typeof props.max !== 'undefined' && +finalValue > +props.max) finalValue = +props.max;
  return finalValue;
}
function setValues(val: Value) {
  const finalModeValue = getFinalModelValue(val);
  modelValue.value = finalModeValue;
  inputValue.value = finalModeValue;
  return finalModeValue;
}

onMounted(() => {
  if (props.autofocus) {
    focus();
    handleInputClick(null);
  }
});
</script>

<template>
  <div class="ck-input" :style="computedStyle">
    <!-- label -->
    <ck-label v-if="label" for="ck-input" :size="size" :align="finalLabelAlign">
      {{ label }} <span v-if="optional" class="ck-input__optional-label">opcional</span>
    </ck-label>
    <div class="ck-input__content">
      <!-- button minus -->
      <ck-button
        v-if="plusMinusButtons"
        size="s"
        icon="minus"
        group="left"
        type="filled"
        class="ck-input-plus-minus-buttons"
        @click="handleMinusButtonClick()"
      />
      <!-- icon left -->
      <ck-icon
        v-if="icon"
        class="ck-input__icon-left"
        :color="iconColor ? iconColor : 'lightgrey'"
        :icon="icon"
        :icon-pack="iconPack"
        size="s"
      />
      <input
        ref="inputRef"
        v-model="inputValue"
        :type="isShowingPassword ? 'text' : type"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :placeholder="placeholder"
        :class="computedClassInput"
        :style="computedStyleInput"
        :disabled="disabled"
        @click="handleInputClick($event)"
        @input="handleInputInput()"
        @change="handleInputChange()"
        @focus="handleInputFocus($event)"
        @blur="handleInputBlur($event)"
      />
      <div
        class="show-password"
        v-if="type === 'password'"
        :class="layout || cleekOptions?.styles.layout"
        @click="isShowingPassword = !isShowingPassword"
      >
        <ck-icon :icon="isShowingPassword ? 'eye-slash' : 'eye'" />
      </div>
      <!-- icon right -->
      <ck-icon
        v-if="iconRight && type !== 'password'"
        class="ck-input__icon-right"
        :color="iconColor ? iconColor : 'lightgrey'"
        :icon="iconRight"
        :icon-pack="iconPack"
      />
      <!-- button plus -->
      <ck-button
        v-if="plusMinusButtons"
        size="s"
        icon="plus"
        group="right"
        type="filled"
        class="ck-input-plus-minus-buttons"
        @click="handlePlusButtonClick()"
      />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-input
  display inline-block
  position relative
  align-items flex-end
  &:focus-within
    z-index 99999
  .ck-input__optional-label
    color #aaa
    font-size 0.75rem
    padding-left 0.25rem
    margin-left auto
  .ck-input__content
    $border-width = 1px
    display inline-flex
    align-items center
    justify-content center
    width 100%
    input
      font-size $globalFontSize-s
      box-sizing border-box
      min-height 40px
      width 100%
      padding $globalPadding
      border-radius $globalBorderRadius
      border $border-width solid $globalBorderColor
      &::placeholder
        color $color-placeholder
      &:-ms-input-placeholder
        color $color-placeholder
      &::-ms-input-placeholder
        color $color-placeholder
      &:focus
        outline 2px solid var(--primary)
      &.rounded
        border-radius 10rem
      &.squared
        border-radius 0
      &.align--center
        text-align center
      &.align--right
        text-align right
      &.no-border
        border-color transparent !important
      &.has-icon-left
        padding-left 14px + 3 * $globalPadding
      &.has-icon-right
        padding-right 14px + 3 * $globalPadding
      &.ck-input-size__s
        font-size 0.7rem
        min-height unset
        padding 0.35rem 0.5rem
      &.ck-input-size__l
        font-size 1.3rem
        padding 0.75rem 1.5rem
        border-radius 0.5rem
      &.ck-input-size__xl
        font-size 1.5rem
        padding 0.75rem 1.5rem
        border-radius 0.5rem
      &:disabled
        input-disabled()
    .ck-input__icon-left
    .ck-input__icon-right
      position absolute
      bottom 13px
      z-index 1
    .show-password
      position absolute
      right $border-width
      bottom $border-width
      height 38px
      width @height
      padding 0 0.4rem
      border-left 1px solid $globalBorderColor
      border-radius $globalBorderRadius
      color #666
      background-color #eee
      flex-center()
      transition 0.3s
      &:hover
        cursor pointer
        background-color #f0f0f0
      &.rounded
        border-radius 10rem
      &.squared
        border-radius 0
    .ck-input__icon-left
      left 1.5 * $globalPadding
    .ck-input__icon-right
      right 1.5 * $globalPadding

// remove arrows | chrome
input::-webkit-outer-spin-button
input::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
// remove arrows | firefox
input[type=number]
  -moz-appearance textfield
</style>
