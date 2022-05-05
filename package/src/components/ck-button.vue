<template lang="pug">
button(
type="button"
:class="computedClass"
:title="title"
:aria-label="title"
:disabled="disabled"
:style="computedStyle"
@click="onClick($event)"
)
  ck-icon.ck-button__icon-left(
  v-if="icon"
  :icon="icon"
  :icon-pack="iconPack"
  :class="{ 'just-icon': !$slots.default }"
  )
  slot
  ck-icon.ck-button__icon-right(
  v-if="iconRight"
  :icon="iconRight"
  :icon-pack="iconPack"
  :class="{ 'just-icon': !$slots.default }"
  )
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import validators from '../utils/validators';
import functions from '../utils/functions';
import globalVariables from '../utils/globalVariables';
import ckIcon from './ck-icon.vue';
import useWindowWidth from '../hooks/windowWidth';

const { windowWidth } = useWindowWidth();

const defaultButtonType = 'outlined';

const props = defineProps({
  // html
  title: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  // style
  type: { type: String, default: undefined, validator: validators.buttonType },
  color: { type: String, default: 'primary' },
  align: { type: String, default: 'left', validator: validators.align },
  size: { type: String, default: 'm', validator: validators.size },
  width: { type: String, default: '' },
  rounded: { type: Boolean, default: false },
  // icon
  icon: { type: [String, Array], default: undefined },
  iconPack: { type: String, default: undefined },
  iconRight: { type: String, default: undefined },
  // label
  label: { type: String, default: undefined },
  labelAlign: { type: String, default: undefined },
  // group
  group: { type: String, default: undefined, validator: validators.group },
  widthBreaks: { type: Array, default: undefined },
  groupVertical: { type: String, default: undefined, validator: validators.groupVertical  },
});

let $cleekOptions;
const isMounted = ref(false);

const emits = defineEmits(['click']);

const realButtonType = computed(() => {
  // if (!validators.buttonType(props.type)) type = 'outlined';
  if (props.type) return props.type;
  if (isMounted.value) {
    if ($cleekOptions) return $cleekOptions.button.type;
  }
  return defaultButtonType;
});
const computedClass = computed(() => {
  const list = [];
  // group
  list.push(functions.getGroupClass(props, windowWidth.value));
  // color
  if (props.color !== 'primary') {
    if (realButtonType.value === 'filled') {
      list.push(`ck-component__bg-color--${props.color}`);
    } else {
      list.push(`ck-component__border-color--${props.color}`);
    }
  }
  // align
  if (props.align === 'center' || props.align === 'right') {
    list.push(`ck-button__align--${props.align}`);
  }
  // rounded
  if (props.rounded) console.log('rounded');
  if (props.rounded) list.push('rounded');
  // type
  list.push(`type-${realButtonType.value}`);
  // size
  if (props.size) list.push(`ck-button-size__${props.size}`);
  return list;
});
const computedStyle = computed(() => {
  const list = [];
  // width-break
  let isWidthDefined = false;
  if (props.widthBreaks) {
    const width = functions.getWidthByWidthBreaks(props.widthBreaks, windowWidth.value )
    if (width) {
      isWidthDefined = true;
      list.push({ width });
    }
  }
  // width
  if (props.width && !isWidthDefined) list.push({ width: props.width });
  return list;
});

function onClick(event) {
  emits('click', event)
}

onMounted(() => {
  $cleekOptions = functions.getCleekOptions(getCurrentInstance);
  isMounted.value = true;
});
</script>

<style lang="stylus" scoped>
@import '../styles/.variables.styl'

button
  cursor pointer
  display inline-flex
  align-items center
  min-height $globalMinHeight
  border-radius $globalBorderRadius
  position relative
  font-size $globalFontSize
  padding $globalPadding (2 * $globalPadding)
  justify-content flex-start
  background-color white
  &.ck-button__align--center
    justify-content center
  &.ck-button__align--right
    justify-content flex-end
  &::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    border-radius 4px
    z-index 1
    opacity 0
    transition opacity 0.15s ease-in-out
    background-color var(--primary)
  &:hover::before
    opacity 0.1
  &:active::before
    opacity 0.2
  &.type-filled
    background-color var(--primary)
    border 1px solid var(--primary)
    color white
  &.rounded
    border-radius 10rem
    &::before
      border-radius 10rem
  &.type-outlined
    // background-color transparent
    border 1px solid var(--primary)
    color var(--primary)
  &.type-flat
    background-color transparent
    border none
    color var(--primary)
  &.type-filled:disabled,
  &.type-outlined:disabled,
  &.type-flat:disabled
    border-color #eeeeee
    background-color #eeeeee
    cursor not-allowed
  &:disabled::before
    display none
  &:disabled > span
    color $color-disabled
  > .ck-button__icon-left
    margin-right .5rem
    &.just-icon
      margin-right 0
  > .ck-button__icon-right
    margin-left .5rem
    &.just-icon
      margin-left 0
  &.ck-button-size__s
    font-size .7rem
    min-height unset
    padding .35rem .5rem
  &.ck-button-size__l
    font-size 1.2rem
    padding .75rem 1.5rem
</style>
