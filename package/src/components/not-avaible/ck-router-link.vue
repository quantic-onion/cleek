<template lang="pug">
//- router link
router-link(v-if="!disabled" v-bind="$attrs" @click="onClick($event)")
  slot

//- span
span(v-else v-bind="$attrs" @click="onClick($event)")
 slot
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: { type: Boolean, default: false },
});

const emits = defineEmits(['click']);

function onClick(event) {
  emits('click', event);
}
</script>