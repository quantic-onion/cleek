<template lang="pug">
ck-th(
v-if="isVisible"
:align="col.align"
:min-width="col.minWidth"
)
  | {{ col.title }}
</template>

<script>
import functions from '../../utils/functions';
import ckTh from '../ck-th.vue';

export default {
  components: {
    ckTh,
  },
  props: {
    col: { type: Object, required: true },
  },
  computed: {
    isVisible() {
      return functions.isTableColumnsVisible(this.col);
    },
  }, // computed
}; // export default
</script>
