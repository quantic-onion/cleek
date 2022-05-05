<template lang="pug">
.ck-input(
:style="computedStyle"
)
  //- label
  ck-label(v-if="label" :align="realLabelAlign" for="ck-input" :size="size") {{ label }}
  //- icon left
  ck-icon.ck-input__icon-left(
  v-if="icon"
  color="lightgrey"
  :icon="icon"
  :icon-pack="iconPack"
  )
  //- input
  //- :id="label ? 'ck-input' : ''"
  input(
  ref="realInput"
  v-model="value"
  :autocomplete="autocomplete ? 'on' : 'off'"
  :type="type"
  :placeholder="placeholder"
  :class="computedClassInput"
  :disabled="disabled"
  @change="onChange($event)"
  @input="onInput($event)"
  @click="onClick($event)"
  )
  //- icon right
  ck-icon.ck-input__icon-right(
  v-if="iconRight"
  color="lightgrey"
  :icon="iconRight"
  :icon-pack="iconPack"
  )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import functions from '../utils/functions';
import validators from '../utils/validators';
import ckLabel from './ck-label.vue';
import ckIcon from './ck-icon.vue';
import useWindowWidth from '../hooks/windowWidth';

const { windowWidth } = useWindowWidth(); 

defineExpose({ setFocus, setSelect });

const props = defineProps({
  modelValue: {  },
  type: { type: String, validator: validators.inputType, default: 'text' },
  autocomplete: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: undefined },
  // label
  label: { type: String, default: undefined },
  labelAlign: { type: String, validator: validators.align, default: undefined },
  // icon
  icon: { type: [String, Array], default: undefined },
  iconPack: { type: String, default: undefined },
  iconRight: { type: String, default: undefined },
  // group
  group: { type: String, default: undefined },
  groupVertical: { type: String, default: undefined },
  widthBreaks: { type: Array, default: undefined },
  // style
  size: { type: String, default: 'm', validator: validators.size },
  hideBorder: { type: Boolean, default: false },
  width: { type: String, default: undefined },
  align: { type: String, validator: validators.align, default: undefined },
  rounded: { type: Boolean, default: false },
  // functions
  autoSelect: { type: Boolean, default: false },
  delayChangeTime: { type: [Number, String], default: 300 }
});

const realInput = ref(null);

const emits = defineEmits(['update:modelValue', 'click', 'input', 'change', 'delayChange']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits('update:modelValue', val);
    checkSearchTime(val);
  },
});

const realLabelAlign = computed(() => {
  if (props.labelAlign) return props.labelAlign;
  if (props.align) return props.align;
  return 'left';
})

// events
const onClick = (event) => {
  if (props.autoSelect) event.target.select();
  emits('click', event);
};
const onInput = (event) => {
  emits('input', event);
};
const onChange = (event) => {
  emits('change', event);
};

// style
const computedClassInput = computed(() => {
  const list = [];
  // group
  list.push(functions.getGroupClass(props, windowWidth.value));
  // icon
  if (props.icon) list.push('has-icon-left');
  if (props.iconRight) list.push('has-icon-right');
  // align
  if (props.align) list.push(`align--${props.align}`);
  // hideBorder
  if (props.hideBorder) list.push('no-border');
  // rounded
  if (props.rounded) list.push('rounded');
  // size
  if (props.size) list.push(`ck-input-size__${props.size}`);
  return list;
});

const computedStyle = computed(() => {
  const list = [];
  // width
  list.push({ width: props.width });
  // width-break
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value )
    if (width) list.push({ width });
  }
  return list;
});

function setFocus() {
  realInput.value.focus();
}
function setSelect() {
  realInput.value.select();
}

function checkSearchTime(oldValue) {
  setTimeout(() => {
    if (value.value === oldValue) {
      emits('delayChange', oldValue);
    }
  }, +props.delayChangeTime);
}
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-input
  display inline-block
  position relative
  > input
    width 100%
    padding $globalPadding
    font-size $globalFontSize-s
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color var(--primary)
    &.rounded
      border-radius 10rem
    &.align--center
      text-align center
    &.align--right
      text-align right
    &.no-border
      border-color transparent
    &.has-icon-left
      padding-left 14px + (3 * $globalPadding)
    &.has-icon-right
      padding-right 14px + (3 * $globalPadding)
    &.ck-input-size__s
      font-size .7rem
      min-height unset
      padding .35rem .5rem
    &.ck-input-size__l
      font-size 1.3rem
      padding .75rem 1.5rem
      border-radius .5rem
    &.ck-input-size__xl
      font-size 1.5rem
      padding .75rem 1.5rem
      border-radius .5rem
    &:disabled
      cursor not-allowed
      border-color $color-disabled
      color $color-disabled
      background-color #e0e0e0
  > .ck-input__icon-left,
  > .ck-input__icon-right
    position absolute
    bottom 13px
    z-index 1
  > .ck-input__icon-left
    left 1.5 * $globalPadding
  > .ck-input__icon-right
    right 1.5 * $globalPadding
  
// remove arrows | chrome
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
// remove arrows | firefox
input[type=number]
  -moz-appearance textfield

// all styles
@require '../styles/index'
</style>