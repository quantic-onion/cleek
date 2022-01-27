<template lang="pug">
.mb-2
  p State: {{ state }}
  ck-switch(v-model="state")
    | Switch
.mb-2
  ck-switch(squared v-model="state")
    | Switch Square
.mb-2
  ck-switch(outlined v-model="state")
    | Switch Outlined
.mb-2
  ck-switch(squared outlined v-model="state")
    | Switch Square Outlined
.mb-2
  ck-switch(:modelValue="false" disabled)
    | Unchecked disabled
.mb-2
  ck-switch(:modelValue="true" disabled)
    | Checked disabled
</template>

<script>
import { ckSwitch } from '../../../src/components/index'

export default {
  name: 'CkSwitchExample',
  components: {
    ckSwitch,
  },
  data() {
    return {
      state: false,
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
