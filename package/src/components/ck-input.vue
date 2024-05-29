<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { qmStr } from 'quantic-methods';
import type { Ref } from 'vue';
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
  CleekOptions,
  Icon,
  IconPack,
  InputType,
  Layout,
  SizeInCSS,
  WidthBreaks,
} from '../types/cleek-options';

const props = defineProps<{
  modelValue: string | number;
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
  fontSize: SizeInCSS;
  size?: 's' | 'm' | 'l' | 'xl'; // default m
  hideBorder?: boolean;
  width?: string;
  align?: Align;
  layout?: Layout;
  borderColor?: Color;
  textColor?: Color;
  // functions
  autofocus?: boolean;
  capitalize?: boolean;
  autoSelect?: boolean;
  delayChangeTime?: number;
  justInteger?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'click', event: Event): void;
  (e: 'input', event: Event): void;
  (e: 'change', event: Event): void;
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
  (e: 'delayChange', value: string | number): void;
}>();

defineExpose({ setFocus, setSelect });

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const defaultType = 'text';
const plusMinusButtonsDefaultWithInput = '120px';
const plusMinusButtonsDefaultAlign = 'center';
const defaultDelayChangeTime = 300;

const realInput: Ref<null | HTMLInputElement> = ref(null);
const isShowingPassword = ref(false);

const { windowWidth } = useWindowWidth();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val: string | number) {
    if (props.capitalize) val = qmStr.capitalize(`${val}`);
    if (props.justInteger) val = parseInt(`${+val}`);
    if (typeof props.min !== 'undefined' && (+val < +props.min)) val = +props.min;
    if (typeof props.max !== 'undefined' && (+val > +props.max)) val = +props.max;
    emits('update:modelValue', val);
    checkSearchTime(val);
  },
});

const realLabelAlign = computed(() => {
  if (props.labelAlign) return props.labelAlign;
  if (props.align) return props.align;
  if (props.plusMinusButtons) return plusMinusButtonsDefaultAlign;
  return 'left';
});

// events
const onClick = (event: Event) => {
  if (props.autoSelect) realInput.value?.select();
  emits('click', event);
};
const onInput = (event: Event) => {
  emits('input', event);
};
const onChange = (event: Event) => {
  emits('change', event);
};

// style
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
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(layout);
  // size
  if (props.size) list.push(`ck-input-size__${props.size}`);
  // border-color
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
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
  const borderColor = props.borderColor || cleekOptions.value?.styles.borderColor;
  if (borderColor && !hooks.isColorTemplateVariable(borderColor)) {
    list.push({ 'border-color': borderColor });
  }
  // background-color
  let backgroundColor = '';
  if (cleekOptions.value?.popup.headerColor) backgroundColor = cleekOptions.value?.popup.headerColor;
  if (cleekOptions.value?.darkMode) backgroundColor = cleekOptions.value?.darkModeColorItems;
  if (backgroundColor && !hooks.isColorTemplateVariable(backgroundColor)) {
    list.push({ backgroundColor: backgroundColor });
  }
  // text-color
  let textColor = props.textColor || cleekOptions.value?.popup.textColor;
  if (cleekOptions.value?.darkMode) textColor = cleekOptions.value?.darkModeColorText;
  if (textColor && !hooks.isColorTemplateVariable(textColor)) {
    list.push(`ck-component__color--${textColor}`);
    list.push({ color: textColor });
  }
  return list;
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

function setFocus() {
  realInput.value?.focus();
}
function setSelect() {
  realInput.value?.select();
}

function checkSearchTime(oldValue: string | number) {
  setTimeout(() => {
    if (value.value === oldValue) emits('delayChange', oldValue);
  }, props.delayChangeTime || defaultDelayChangeTime);
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
  if (props.autofocus) {
    setFocus();
  }
});
</script>

<template>
  <div class="ck-input" :style="computedStyle">
    <!-- label -->
    <ck-label v-if="label" for="ck-input" :size="size" :align="realLabelAlign">
      {{ label }}
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
        @click="value = (+value) - 1"
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
        v-if="isShowingPassword"
        v-model="value"
        ref="realInput"
        type="text"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :placeholder="placeholder"
        :class="computedClassInput"
        :style="computedStyleInput"
        :disabled="disabled"
        @change="onChange($event)"
        @input="onInput($event)"
        @click="onClick($event)"
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
      />
      <input
        v-else
        v-model="value"
        ref="realInput"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :type="type || defaultType"
        :placeholder="placeholder"
        :class="computedClassInput"
        :style="computedStyleInput"
        :disabled="disabled"
        @change="onChange($event)"
        @input="onInput($event)"
        @click="onClick($event)"
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
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
        @click="value = (+value) + 1"
      />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-input
  display inline-block
  position relative
  align-items flex-end
  .ck-input__content
    display inline-flex
    align-items center
    justify-content center
    width 100%
    > input
      width 100%
      padding $globalPadding
      font-size $globalFontSize-s
      border-radius $globalBorderRadius
      border 1px solid $globalBorderColor
      min-height 40px
      box-sizing border-box
      &::placeholder
        color $color-placeholder
      &:-ms-input-placeholder
        color $color-placeholder
      &::-ms-input-placeholder
        color $color-placeholder
      &:focus-visible
        outline-color var(--primary)
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
        cursor not-allowed
        border-color $color-disabled
        color $color-disabled
        background-color #e0e0e0
    > .ck-input__icon-left
    > .ck-input__icon-right
      position absolute
      bottom 13px
      z-index 1
    > .show-password
      background-color #eee
      color #666
      cursor pointer
      position absolute
      right 1px
      bottom 1px
      height 38px
      width @height
      display flex
      align-items center
      justify-content center
      transition 0.3s
      border-left 1px solid $globalBorderColor
      &:hover
        background-color #f0f0f0
      &.rounded
        border-radius 10rem
      &.squared
        border-radius 0
    > .ck-input__icon-left
      left 1.5 * $globalPadding
    > .ck-input__icon-right
      right 1.5 * $globalPadding

// remove arrows | chrome
input::-webkit-outer-spin-button
input::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
// remove arrows | firefox
input[type=number]
  -moz-appearance textfield

// all styles
@require '../styles/index'
</style>
