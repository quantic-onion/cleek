<template lang="pug">
ck-icon.mr-2.mb-2(icon="helicopter")
ck-icon.mr-2.mb-2(spin icon="spinner")
ck-icon.mr-2.mb-2(icon="user")
</template>

<script>
import { ckIcon } from '../../../src/components/index';

export default {
  name: 'CkIconExample',
  components: {
    ckIcon,
  },
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../src/styles/tailwind-fake'
</style>
