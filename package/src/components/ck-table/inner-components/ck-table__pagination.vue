<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
// components
import CkIcon from '../../ck-icon.vue';
// types
import type { Align, Layout, CleekOptions } from '../../../cleek-options/cleek-options.types';
// hooks
import hooks from '../../../utils/global-hooks';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
  align: Align;
  itemsPerPage: number;
  listLength: number;
  layout: Layout;
}>();

const emits = defineEmits<{
  (e: 'refreshList'): void;
  (e: 'update:currentPage', value: number): void;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const itemsShowed = 5;

const currentPageLocal = computed({
  get() {
    return props.currentPage;
  },
  set(val: number) {
    emits('update:currentPage', val);
  },
});
const currentPageInputValue = computed({
  get() {
    return props.currentPage;
  },
  set() {},
});
const hasArrowLeft = computed(() => {
  return props.currentPage !== 1;
  //   if (!listLeft.value.length) return false;
  //   return listLeft.value[0] !== 1;
});
const hasArrowRight = computed(() => !!listRight.value.length);

const listLeft = computed(() => {
  if (!props.listLength) return [];
  const list = [];
  const listLength = (itemsShowed - 1) / 2;
  for (const num of Array(listLength).keys()) {
    const listItem = props.currentPage - num - 1;
    if (listItem > 0) list.unshift(listItem);
  }
  return list;
});
const listRight = computed(() => {
  if (!props.listLength) return [];
  const list = [];
  const listLength = (itemsShowed - 1) / 2;
  for (const num of Array(listLength).keys()) {
    const listItem = props.currentPage + num + 1;
    if (listItem <= props.totalPages) list.push(listItem);
  }
  return list;
});
const computedClass = computed(() => {
  const list = [];
  // align
  const align = props.align || 'center';
  if (align) list.push(`pagination-align--${align || 'center'}`);
  // layout
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(layout);
  return list;
});

watch(
  () => currentPageLocal.value,
  () => {
    emits('refreshList');
  },
);

function updatePageByInput(eventTarget: HTMLInputElement) {
  let newValue = +eventTarget.value;
  // validate
  if (newValue > props.totalPages) newValue = props.totalPages;
  if (newValue < 1) newValue = 1;
  // set value
  if (props.currentPage === newValue) {
    eventTarget.value = `${newValue}`;
  } else {
    currentPageLocal.value = newValue;
  }
}
function onClickArrowRight() {
  if (!hasArrowRight.value) return;
  currentPageLocal.value = props.currentPage + 1;
}

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
<div
class="ck-table__pagination-container"
:class="computedClass"
>
  <div class="ck-table__pagination">
    <!-- arrow left -->
    <div
      class="ck-table__pagination--arrow-left"
      :class="{ disabled: !hasArrowLeft }"
      @click="currentPageLocal = currentPage - 1"
    >
      <ck-icon :icon="hasArrowLeft ? 'angle-left' : 'grip-lines-vertical'"/>
    </div>
    <div class="ck-table__pagination--numbers-container">
      <!-- list left -->
      <div
        v-for="num in listLeft"
        class="ck-table__pagination-item--left"
        @click="currentPageLocal = num"
      >
        {{ num }}
      </div>
      <!-- input -->
      <!-- autoSelect  -->
      <!-- width="50px" -->
      <!-- align="center" -->
      <div class="ck-table__pagination-input-container">
        <input
          v-model="currentPageInputValue"
          class="ck-table__pagination-input"
          type="number"
          @click="$event.target.select()"
          @change="updatePageByInput($event.target)"
        />
        <div class="ck-table__pagination--input-pointer"/>
      </div>
      <!-- list right -->
      <div
        v-for="num in listRight"
        class="ck-table__pagination-item--right"
        @click="currentPageLocal = num"
      >
        {{ num }}
      </div>
    </div>
    <!-- arrow right -->
    <div
      class="ck-table__pagination--arrow-right"
      :class="{ disabled: !hasArrowRight }"
      @click="onClickArrowRight()"
    >
      <ck-icon :icon="hasArrowRight ? 'angle-right' : 'grip-lines-vertical'"/>
    </div>
  </div>
</div>
</template>

<style lang="stylus" scoped>
$item-size = 40px
$border-color = #aaa
.ck-table__pagination-container
  display flex
  align-items center
  &.pagination-align--center
    justify-content center
  &.pagination-align--right
    justify-content flex-end
  .ck-table__pagination
    flex-center()
    .ck-table__pagination-input
    .ck-table__pagination-item--left
    .ck-table__pagination-item--right
    .ck-table__pagination--arrow-left
    .ck-table__pagination--arrow-right
      inline-flex-center()
      padding 0
      box-sizing border-box
      background-color white
      width $item-size
      height @width
      cursor pointer
      border 1px solid $border-color
      transition 0.2s
      color #666
      &:hover
        background-color rgba(black, 0.05)
    .ck-table__pagination-item--left
      border-right 0
      &:first-of-type
        border-left 0
    .ck-table__pagination-item--right
      border-left 0
      &:last-of-type
        border-right 0
      // border 1px solid $border-color
    .ck-table__pagination-input-container
      position relative
      .ck-table__pagination-input
        cursor text
        background-color #999
        font-weight bold
        text-align center
        background-color var(--primary)
        border-color var(--primary)
        color white
      .ck-table__pagination--input-pointer
        position absolute
        left 0
        right 0
        margin-x auto
        width 0.75rem
        height 2px
        background-color white
        border-radius 1px
        bottom 0.5rem
    .ck-table__pagination--numbers-container
      display flex
      align-items flex-end
      unselectable()
    //   background-color white
    //   flex-center()
    //   border 1px solid $border-color
    //   font-weight bold
    //   color #333
    //   .ck-table__pagination-item
    //     background-color var(--primary)
    //     color white
    //     &.pagination-item__left
    //       margin-right ($globalPadding / 2)
    //     &.pagination-item__right
    //       margin-left ($globalPadding / 2)
    // arrow
    .ck-table__pagination--arrow-left
    .ck-table__pagination--arrow-right
      &.disabled
        background-color #eee
        color #999
        cursor auto
    .ck-table__pagination--arrow-left
      border-radius-left 0.3rem
    .ck-table__pagination--arrow-right
      border-radius-right 0.3rem
    //   width $item-size
    //   height @width
    // border 1px solid var(--primary)
  // .ck-table__pagination--arrow-left
  //   margin-right $globalPadding
  //   border-right 0
  // .ck-table__pagination--arrow-right
  //   margin-left $globalPadding
  //   border-left 0

.ck-table__pagination-container
  &.rounded
    .ck-table__pagination
      .ck-table__pagination--arrow-left
        border-radius-left 2rem
        padding-left 0.2rem
        width 44px
      .ck-table__pagination--arrow-right
        border-radius-right 2rem
        padding-right 0.2rem
        width 44px
  &.squared
    .ck-table__pagination
      .ck-table__pagination--arrow-left
      .ck-table__pagination--arrow-right
        border-radius 0

// REMOVE INPUT ARROWS
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button
input::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
/* Firefox */
input[type=number]
  -moz-appearance textfield
</style>
