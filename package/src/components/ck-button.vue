<template lang="pug">
button(
type="button"
:class="computedClass"
:title="title"
:aria-label="title"
:disabled="disabled"
@click="onClick($event)"
)
  ck-icon.ck-button__icon-left(
  v-if="icon"
  :icon="icon"
  :icon-pack="iconPack"
  )
  slot
  ck-icon.ck-button__icon-right(
  v-if="iconRight"
  :icon="iconRight"
  :icon-pack="iconPack"
  )
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import validators from '../utils/validators';
import functions from '../utils/functions';
import globalVariables from '../utils/globalVariables';
import ckIcon from './ck-icon.vue';

const props = defineProps({
  // html
  title: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  // style
  type: { type: String, default: 'outlined', validator: validators.buttonType },
  color: { type: String, default: 'primary' },
  align: { type: String, default: 'left', validator: validators.align },
  // icon
  icon: { type: [String, Array], default: undefined },
  iconPack: { type: String, default: undefined },
  iconRight: { type: String, default: undefined },
  // label
  label: { type: String, default: undefined },
  labelAlign: { type: String, default: undefined },
  // group
  group: { type: String, default: undefined, validator: validators.group },
  groupBreak: { type: String, default: 's' },
  groupVertical: { type: String, default: undefined, validator: validators.groupVertical  },
});

let context;
const isMounted = ref(false);

const emits = defineEmits(['click']);

const computedClass = computed(() => {
  const classList = [];
  // group
  classList.push(functions.getGroupClass(props));
  // color
  if (props.color !== 'primary') {
    if (props.type === 'filled') {
      classList.push(`ck-component__bg-color--${props.color}`);
    } else {
      classList.push(`ck-component__border-color--${props.color}`);
    }
  }
  // align
  if (props.align !== 'left') {
    classList.push(`ck-button__align--${props.align}`);
  }
  // icon margin
  if (isMounted.value) {
    if (!context.$slots.default) {
      if (props.icon || props.iconRight) {
        if (!(props.icon && props.iconRight)) classList.push('just-icon');
      }
    }
  }

  // type
  let type = props.type;
  if (!validators.buttonType(props.type)) type = 'outlined';
  classList.push(`type-${type}`)
  // if (props.size) classList.push(`rs-component-size__${props.size}`);
  return classList;
});

function onClick(event) {
  emits('click', event)
}

onMounted(() => {
  context = getCurrentInstance().ctx;
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
  &.type-outlined
    background-color transparent
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
  > .ck-button__icon-right
    margin-left .5rem
  &.just-icon
    > .ck-button__icon-left
      margin-right 0
    > .ck-button__icon-right
      margin-left 0

</style>
