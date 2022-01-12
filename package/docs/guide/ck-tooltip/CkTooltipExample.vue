<template lang="pug">
  ck-tooltip(content="Hi 👋 I am a tooltip")
    span Hover me please
</template>

<script>
import { ckTooltip } from '../../../src/components/index';

export default {
  name: 'CkTooltipExample',
  components: {
    ckTooltip,
  },
}; // export default
</script>
