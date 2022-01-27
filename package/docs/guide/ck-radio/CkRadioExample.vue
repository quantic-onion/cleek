<template lang="pug">
.mb-2
  p Selected value: {{ selectedValue }}
  ck-radio(
  name="example"
  v-model="selectedValue1"
  :options="options"
  )
.mb-2
  p Here is an example of a disabled radio group
  ck-radio(
  disabled
  name="disabled-example"
  v-model="selectedValue2"
  :options="options"
  )
</template>

<script>
import { ckRadio } from '../../../src/components/index';

export default {
  name: 'CkRadioExample',
  components: {
    ckRadio,
  },
  data() {
    return {
      selectedValue1: 'value1',
      selectedValue2: 'value1',
      options: [
        { label: 'Label 1', value: 'value1' },
        { label: 'Label 2', value: 'value2' },
      ],
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
