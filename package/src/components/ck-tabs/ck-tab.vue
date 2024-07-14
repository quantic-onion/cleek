<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
// types
import { Icon } from '@/types/cleek-options';

const props = defineProps<{
  title: string;
  icon: Icon;
}>();

const addTab = inject('addTab');
const isActive = ref(false);

function selectTab(value) {
  isActive.value = value;
}

onMounted(() => {
  addTab({
    selectTab: selectTab,
    icon: props.icon,
    title: props.title,
  });
});
</script>

<template>
  <div v-if="isActive" class="ck-tab">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.ck-tab
  padding 1rem
  background-color white
  ck-box-shadow()
  border-radius-bottom 0.25rem
</style>