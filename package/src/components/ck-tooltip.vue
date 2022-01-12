<template lang="pug">
.ck-tooltip(tabindex="0")
  slot
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  name: 'CkTooltip',
  props: {
    content: { type: String, required: true },
  },
  mounted() {
    tippy(this.$el, {
      content: this.content,
    });
  },
}; // export default
</script>

<style lang="stylus" scoped>
.ck-tooltip
  width -moz-fit-content
  width fit-content
</style>
