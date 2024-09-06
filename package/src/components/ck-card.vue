<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// types
import type { CleekOptions, Layout } from '@/types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  modelValue?: any; // boolean (i cannot use boolean to differentiate between false and undefined)
  title?: string;
  subtitle?: string;
  block?: boolean;
  clickable?: boolean;
  layout?: Layout;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'closeCard'): void;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const isCloseable = computed(() => typeof props.modelValue !== 'undefined');
const isActive = computed({
  get() {
    if (!isCloseable.value) return true;
    if (props.modelValue === null) return true;
    return !!props.modelValue;
  },
  set(val: boolean) {
    emits('update:modelValue', val);
    if (!val) emits('closeCard');
  },
});
const computedClass = computed(() => {
  const list = [];
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(`layout--${layout}`);
  if (props.clickable) list.push('clickable');
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
  <div v-if="isActive" class="ck-card" :class="computedClass">
    <!-- header -->
    <div
      v-if="title || $slots.header || isCloseable"
      class="ck-card__header"
      :class="{ 'is-close-button-visible': isCloseable }"
    >
      <!-- header -->
      <div v-if="title || $slots.header" class="ck-card__header-title">
        {{ title }}
        <slot name="header"></slot>
      </div>
      <!-- close btn -->
      <div v-if="isCloseable" class="ck-card__close-btn" @click="isActive = false">
        <ck-icon icon="times"/>
      </div>
    </div>
    <div class="ck-card__body">
      <!-- subtitle -->
      <div v-if="subtitle" class="ck-card__header-subtitle">
        {{ subtitle }}
      </div>
      <!-- content -->
      <div class="ck-card__content" :class="{ 'content-block': block }">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.ck-card
  background-color white
  my-box-shadow(0.1)
  padding 1rem
  border-radius 1rem
  width 100%
  &.clickable
    cursor pointer
    transition 0.3s
    &:hover
      ck-box-shadow(0.35)
  .ck-card__header
    display flex
    align-items center
    justify-content space-between
    padding-bottom 0.5rem
    gap 1.5rem
    &.is-close-button-visible
      margin-right -0.5rem
      margin-top -0.5rem
      padding-bottom 0
    .ck-card__header-title
      font-size 1.1rem
      font-weight 500
    .ck-card__close-btn
      width 35px
      height @width
      display inline-flex
      align-items center
      justify-content center
      border-radius 0.5rem
      cursor pointer
      font-size 1.25rem
      // background-color red
      &:hover
        my-box-shadow(0.1)
  .ck-card__body
    width 100%
    .ck-card__content
      width 100%
      display flex
      flex-wrap wrap
      align-items flex-end
      &.content-block
        display block
    .ck-card__header-subtitle
      margin-left 1.5rem
      font-size 0.9rem
      margin-bottom 1rem

// layout
.ck-card
  &.layout--squared
    border-radius 0
    .ck-card__close-btn
      border-radius 0
</style>
