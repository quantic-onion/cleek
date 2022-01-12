<template lang="pug">
.ck-icon(
@click="onClick($event)"
)
  font-awesome-icon(
  v-if="computedIconPackage === 'font-awesome'"
  :icon="icon"
  :size="size"
  :rotation="rotation"
  :flip="flip"
  :pull="pull"
  :spin="spin"
  :pulse="pulse"
  :inverse="inverse"
  :fixed-width="fixedWidth"
  :swap-opacity="swapOpacity"
  )
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'CkIcon',
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: { type: [String, Array], default: '' },
    iconPackage: { type: String, default: '' },
    size: { type: String, default: null }, // xs || lg || 6x
    rotation: { type: String, default: null }, // 90 || 180 || 270
    flip: { type: String, default: null }, // horizontal || vertical || both
    pull: { type: String, default: null }, // left || right
    spin: { type: Boolean, default: false }, // true actives animation
    pulse: { type: Boolean, default: false }, // true actives animation
    inverse: { type: Boolean, default: false },
    fixedWidth: { type: Boolean, default: false },
    swapOpacity: { type: Boolean, default: false },
  },
  emits: ['click'],
  computed: {
    computedIconPackage() {
      const defaultPackage = 'font-awesome';
      if (this.iconPackage === '') return defaultPackage;
      if (this.iconPackage === 'feather') return this.iconPackage;
      return defaultPackage;
    },
  }, // computed
  created() {
    library.add(fas);
    library.add(far);
    library.add(fab);
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
</style>