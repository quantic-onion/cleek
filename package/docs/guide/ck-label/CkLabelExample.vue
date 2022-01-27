<template lang="pug">
ck-label.mb-2
  | label-example
ck-label.mb-2(align="center")
  | Helicopter
ck-label.mb-2(align="right")
  | Jerardo Sofovich
</template>

<script>
import { ckLabel } from '../../../src/components/index';

export default {
  name: 'CkLabelExample',
  components: {
    ckLabel,
  },
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
