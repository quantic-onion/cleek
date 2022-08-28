<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  show: 'true' | 'false';
}>();

const exampleTrue = ref(true);
const exampleFalse = ref(false);
</script>

<template lang="pug">
ck-checkbox(v-model="exampleTrue" v-if="show === 'true'")
ck-checkbox(v-model="exampleFalse" v-if="show === 'false'")
</template>