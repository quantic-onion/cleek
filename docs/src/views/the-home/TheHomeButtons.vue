<script setup lang="ts">
const props = defineProps<{
  show: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'dark' | 'icons';
}>();
</script>

<template lang="pug">
ck-button(type="filled" v-if="show === 'primary'")
  | primary
ck-button(color="secondary" type="filled" v-if="show === 'secondary'")
  | secondary
ck-button(color="success" type="filled" v-if="show === 'success'")
  | success
ck-button(color="warning" type="filled" v-if="show === 'warning'")
  | warning
ck-button(color="danger" type="filled" v-if="show === 'danger'")
  | danger
ck-button(color="light" type="filled" v-if="show === 'light'")
  | light
ck-button(color="dark" type="filled" v-if="show === 'dark'")
  | dark
ck-button(icon="child-reaching" icon-right="bicycle" v-if="show === 'icons'")
</template>