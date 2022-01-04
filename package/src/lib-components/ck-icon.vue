<template lang="pug">
.ck-icon
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
  components: {
    FontAwesomeIcon,
  },
  created() {
    library.add(fas);
    library.add(far);
    library.add(fab);
  },
  props: {
    icon: { type: [String, Array], default: '' },
    'icon-package': { type: String, default: '' },
    size: { type: String, default: null }, // xs || lg || 6x
    rotation: { type: String, default: null }, // 90 || 180 || 270
    flip: { type: String, default: null }, // horizontal || vertical || both
    pull: { type: String, default: null }, // left || right
    spin: { type: Boolean, default: false }, // true actives animation
    pulse: { type: Boolean, default: false }, // true actives animation
    inverse: { type: Boolean, default: false },
    'fixed-width': { type: Boolean, default: false },
    'swap-opacity': { type: Boolean, default: false },
  },
  computed: {
    computedIconPackage() {
      const defaultPackage = 'font-awesome';
      if (this.iconPackage === '') return defaultPackage;
      if (this.iconPackage === 'feather') return this.iconPackage;
      return defaultPackage;
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
.ck-icon
  display inline-flex
</style>