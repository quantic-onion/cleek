<script setup lang="ts">
import { qmDate } from 'quantic-methods';
import { computed } from 'vue';

const props = defineProps<{
  datetime?: string | null;
  date?: string | null;
  time?: string | number | null;
  timeInMinutes?: boolean;
  noDateMsg?: string;
  split?: boolean;
}>();

const emits = defineEmits<{
  (e: 'click', event: Event): void;
}>();

const computedTime = computed(() => {
  if (props.time) {
    if (props.timeInMinutes) return qmDate.minToHour(+props.time);
    return qmDate.minToHour(+props.time);
  }
  return qmDate.presentTime(props.datetime);
});
const computedDate = computed(() => {
  if (props.date) return qmDate.presentDate(props.date);
  return qmDate.presentDate(props.datetime);
});
</script>

<template>
<!-- no date -->
<span v-if="!computedDate" class="help-text">
  {{ noDateMsg }}
</span>
<!-- date and time split -->
<div
  v-else-if="split || date"
  class="ck-datetime-shower--split"
  @click="emits('click', $event)"
>
  {{ computedDate }}
  <span v-if="computedTime" class="pl-1">
    | {{ computedTime }}
  </span> 
</div>
<!-- date shower -->
<div class="ck-datetime-shower"
  v-else
  v-tooltip="computedTime"
  @click="emits('click', $event)"
>
  {{ computedDate }}
</div>
</template>

<style lang="stylus" scoped>
.ck-datetime-shower--split, .ck-datetime-shower
  max-width max-content
.date-and-time-container
  display flex
.datetime-shower
  cursor pointer
</style>
