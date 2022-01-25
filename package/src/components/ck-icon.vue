<template lang="pug">
.ck-icon(
:class="computedClass"
@click="onClick($event)"
)
  font-awesome-icon(
  v-if="computediconPack === 'font-awesome'"
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
    color: { type: String, default: '' },
    iconPack: { type: String, default: '' },
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
    computediconPack() {
      const defaultPackage = 'font-awesome';
      if (this.iconPack === '') return defaultPackage;
      if (this.iconPack === 'feather') return this.iconPack;
      return defaultPackage;
    },
    computedClass() {
      const classList = [];
      // group
      if (this.color) classList.push(`ck-component__color--${this.color}`);
      return classList;
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
@import '../styles/.variables.styl'
.ck-icon
  color $color-default
  display inline-flex
</style>