<template lang="pug">
.mb-2
  p State: {{ state }}
  ck-checkbox(v-model="state")
    | Checkbox
.mb-2
  ck-checkbox(:modelValue="false" disabled)
    | Unchecked disabled
.mb-2
  ck-checkbox(:modelValue="true" disabled)
    | Checked disabled
</template>

<script>
import { ckCheckbox } from '../../../src/components/index'

export default {
  name: 'CheckboxExample',
  components: {
    ckCheckbox,
  },
  data() {
    return {
      state: true,
    }
  },
} // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
