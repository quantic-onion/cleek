<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const dateValue = ref("");
const time = ref("");
const minutes = ref("");
const widthBreaks = [600, '33.33%']


const isPopupActive = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});
</script>

<template>
  <ck-popup v-model="isPopupActive" title="Test popup with input date">
    <div className="date-container">
      <ck-input-date
        v-model="dateValue"
        icon="user"
        iconColor="primary"
        class="rs-form__input"
        group="left"
        label="Input date"
        :disabled="false"
      />
      <!-- timeInMinutes -->
      <ck-input-time
        v-model="time"
        class="rs-form__input"
        group="center"
        label="Input time"
      />
      <!-- durationInMinutes -->
      <ck-input-time
        v-model="minutes"
        class="rs-form__input"
        group="right"
        label="Input Duration"
      />
    </div>

    <div class="second-row">
      <ck-input-date
        v-model="dateValue"
        class="rs-form__input"
        group="left"
        label="Input date"
        :disabled="false"
        :widthBreaks="widthBreaks"
      />
      <!-- timeInMinutes -->
      <ck-input-time
        v-model="time"
        class="rs-form__input"
        group="center"
        label="Input time"
        :widthBreaks="widthBreaks"
      />
      <!-- text -->
      <ck-input
        v-model="minutes"
        class="rs-form__input"
        group="right"
        label="Input text"
        :widthBreaks="widthBreaks"
      />
    </div>
  </ck-popup>
</template>

<style lang="stylus" scoped>
.date-container
  display flex
  align-items flex-start
.second-row
  display flex
  align-items flex-end
</style>
