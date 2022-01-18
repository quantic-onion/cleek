<template lang="pug">
ck-button.mr-2.mb-2
  | Outlined (default)
ck-button.mr-2.mb-2(type="filled")
  | Filled
ck-button.mr-2.mb-2(type="text")
  | Text
ck-button.mr-2.mb-2(disabled)
  | disabled
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
@import '../../../src/styles/tailwind-fake'
</style>
