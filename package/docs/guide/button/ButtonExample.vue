<template lang="pug">
ck-button.mr-2.mb-2
  | Outlined (default)
ck-button.mr-2.mb-2(type="filled")
  | Filled
ck-button.mr-2.mb-2(type="text")
  | Text
ck-button.mr-2.mb-2(disabled)
  | disabled
</template>

<script>
import { ckButton } from '../../../src/index';

export default {
  name: 'ButtonExample',
  components: {
    ckButton,
  },
}; // export default
</script>

<style lang="stylus" scoped>
.mr-2
  margin-right .5rem
.mb-2
  margin-bottom .5rem
</style>
