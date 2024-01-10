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
        class="rs-form__input"
        :label="'test input'"
        group="left"
        :disabled="false"
      />
      <!-- timeInMinutes -->
      <ck-input-time
        v-model="time"
        class="rs-form__input"
        :label="'message(inputLabelTime)'"
        group="center"
      />
      <!-- durationInMinutes -->
      <ck-input-time
        v-model="minutes"
        class="rs-form__input"
        :label="'message(inputLabelDurationInMinutes)'"
        group="right"
      />
    </div>
  </ck-popup>
</template>

<style lang="stylus" scoped>
.date-container
  display flex
  align-items flex-start
</style>
