<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  show: 'default-true' | 'default-false' | 'outlined' | 'squared-false' | 'squared-true' | 'icon-false' | 'icon-true';
}>();

const exampleTrue1 = ref(true);
const exampleTrue2 = ref(true);
const exampleTrue3 = ref(true);
const exampleFalse1 = ref(false);
const exampleFalse2 = ref(false);
const exampleFalse3 = ref(false);
const exampleFalse4 = ref(false);
</script>

<template lang="pug">
ck-switch(v-model="exampleTrue1" v-if="show === 'default-true'")
ck-switch(v-model="exampleFalse2" v-if="show === 'default-false'")
ck-switch(v-model="exampleFalse1" outlined v-if="show === 'outlined'")
ck-switch(v-model="exampleFalse3" squared v-if="show === 'squared-false'")
ck-switch(v-model="exampleTrue2" squared v-if="show === 'squared-true'")
ck-switch(icon="dollar-sign" v-model="exampleFalse4" v-if="show === 'icon-false'")
ck-switch(icon="dollar-sign" v-model="exampleTrue3" v-if="show === 'icon-true'")
</template>