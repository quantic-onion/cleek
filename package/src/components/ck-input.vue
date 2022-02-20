<template lang="pug">
.ck-input
  //- label
  ck-label(v-if="label" :align="labelAlign" for="ck-input") {{ label }}
  //- icon left
  ck-icon.ck-input__icon-left(
  v-if="icon"
  color="lightgrey"
  :icon="icon"
  :icon-pack="iconPack"
  )
  //- input
  input(
  ref="realInput"
  v-model="value"
  :type="type"
  :placeholder="placeholder"
  :class="computedClassInput"
  :style="computedStyleInput"
  :id="label ? 'ck-input' : ''"
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

defineExpose({ setFocus, setSelect });

const props = defineProps({
  modelValue: {  },
  type: { type: String, validator: validators.inputType, default: 'text' },
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
  groupBreak: { type: String, default: 's' },
  groupVertical: { type: String, default: undefined },
  // style
  hideBorder: { type: Boolean, default: false },
  width: { type: String, default: undefined },
  align: { type: String, validator: validators.align, default: undefined },
  // functions
  autoSelect: { type: Boolean, default: false },
});

const realInput = ref(null);

const emits = defineEmits(['update:modelValue', 'click', 'input', 'change']);

const value = computed({
  get() { return props.modelValue; },
  set(val) { emits('update:modelValue', val); },
});

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
const computedStyleInput = computed(() => {
  const list = [];
  // width
  if (props.width) list.push({ width: props.width });
  return list;
});
const computedClassInput = computed(() => {
  const list = [];
  // group
  list.push(functions.getGroupClass(props));
  // icon
  if (props.icon) list.push('has-icon-left');
  if (props.iconRight) list.push('has-icon-right');
  // align
  if (props.align) list.push(`align--${props.align}`);
  // hideBorder
  if (props.hideBorder) list.push('no-border');
  return list;
});

function setFocus() {
  realInput.value.focus();
}
function setSelect() {
  realInput.value.select();
}
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

.ck-input
  display inline-block
  position relative
  > input
    padding $globalPadding
    font-size $globalFontSize-s
    border-radius $globalBorderRadius
    border 1px solid $globalBorderColor
    min-height 40px
    box-sizing border-box
    &:focus-visible
      outline-color var(--primary)
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
    &:disabled
      cursor not-allowed
      border-color $color-disabled
      color $color-disabled
      background-color #e0e0e0
  > .ck-input__icon-left,
  > .ck-input__icon-right
    position absolute
    bottom 13px
  > .ck-input__icon-left
    left 1.5 * $globalPadding
  > .ck-input__icon-right
    right 1.5 * $globalPadding
@require '../styles/index'
</style>