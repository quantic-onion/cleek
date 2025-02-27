<script setup lang="ts">
import { ref, provide, onMounted, computed } from 'vue';
// types
import { Icon } from '@/cleek-options/cleek-options.types';


const props = defineProps<{
  type?: 'outlined' | 'flat'
}>();

type Tab = {
  selectTab: (value: boolean) => void;
  icon: Icon;
  title: string;
}

const defaultTabsType = 'flat';

const tabs = ref([]);
const selectedTabIndex = ref(null)

const finalTabsType = computed(() => {
  if (props.type) return props.type;
  return defaultTabsType;
});
const computedClass = computed(() => {
  const list = [];
  if (finalTabsType.value) list.push(`ck-tabs__header--button-${finalTabsType.value}`);
  return list;
});

function selectTab(index) {
  tabs.value.forEach((tab, i) => {
    tab.selectTab(i === index)
  });
  selectedTabIndex.value = index;
}

provide('addTab', (tab: Tab) => {
  tabs.value.push(tab);
});

onMounted(() => {
  const activeTab = tabs.value.find(tab => tab.active) || tabs.value[0];
  if (activeTab) {
    selectTab(tabs.value.indexOf(activeTab));
  }
});
</script>

<template>
  <div class="ck-tabs">
    <div class="ck-tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[computedClass, { 'is-selected': selectedTabIndex === index }]"
        @click="selectTab(index)"
      >
        <ck-icon v-if="tab.icon" :icon="tab.icon" />
        {{ tab.title }}
      </div>
    </div>
    <div class="ck-tabs__tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
$border-radius = 0.25rem
.ck-tabs
  .ck-tabs__header
    display flex
    .ck-tabs__header--button-outlined
      cursor pointer
      transition 0.3s
      display inline-flex
      border 1px solid transparent
      border-bottom 1px solid var(--primary)
      padding 0.5rem 1rem
      gap 0.25rem
      border-radius-top $border-radius
      color #888
      &:hover
        background-color dynamic-rgba(--primary-rgb, .15)
      &.is-selected
        border 1px solid var(--primary)
        border-bottom 0
        background-color white
        font-weight 600
        color var(--primary)
    .ck-tabs__header--button-flat
      cursor pointer
      transition 0.3s
      display inline-flex
      border-bottom 4px solid #ddd
      padding 0.5rem 1rem
      gap 0.25rem
      border-radius-top $border-radius
      &:hover
        background-color dynamic-rgba(--primary-rgb, .15)
      &.is-selected
        border-bottom 4px solid var(--primary);
        font-weight 600
        color var(--primary)
</style>
