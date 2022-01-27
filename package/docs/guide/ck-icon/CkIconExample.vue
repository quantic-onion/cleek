<template lang="pug">
ck-icon.mr-2.mb-2(icon="helicopter")
ck-icon.mr-2.mb-2(spin icon="spinner")
ck-icon.mr-2.mb-2(icon="user")
div
  h3.mb-2 Colors
  ck-icon.mr-2.mb-2(icon="user" size="3x")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="primary")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="primary")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="primary-light")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="secondary")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="secondary-light")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="success")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="danger")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="warning")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="dark")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="light")
  ck-icon.mr-2.mb-2(icon="user" size="3x" color="unset")
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
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
