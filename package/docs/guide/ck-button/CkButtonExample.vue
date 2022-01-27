<template lang="pug">
.bg-red
  ck-button.mr-2.mb-2
    | Outlined (default)
  ck-button.mr-2.mb-2(type="filled")
    | Filled
  ck-button.mr-2.mb-2(type="flat")
    | Flat
  ck-button.mr-2.mb-2(disabled)
    | disabled
  ck-button.mr-2.mb-2(icon="square")
  ck-button.mr-2.mb-2(icon="helicopter")
    | Icon
  ck-button.mr-2.mb-2(icon="user" icon-right="times")
    | Icons
</template>

<script>
import { ckButton } from '../../../src/components/index';

export default {
  name: 'ButtonExample',
  components: {
    ckButton,
  },
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
