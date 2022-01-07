<template lang="pug">
.ck-button
  //- ck-label(v-if="label" label-align="labelAlign") {{ label }}
  button(
  :class="computedClass"
  @click="$emit('click', $event)"
  )
    | ck button
    //- icon left
    //- ck-icon.ck-button--icon-left(
    //- v-if="icon"
    //- :icon="icon"
    //- :icon-package="iconPackage"
    //- )
    //- slot
    slot
    //- icon right
    //- ck-icon.ck-button--icon-right(
    //- v-if="iconRight"
    //- :icon="iconRight"
    //- :icon-package="iconPackage"
    //- )
</template>

<script>
import functions from './functions.ts';

export default {
  props: {
    type: { type: String, default: '' }, // outlined || filled
    color: { type: String, default: '' },
    // icon
    icon: { type: [String, Array], default: '' },
    'icon-package': { type: String, default: '' },
    'icon-right': { type: String, default: '' },
    // label
    label: { type: String, default: '' },
    'label-align': { type: String, default: '' },
    // group
    group: { type: String, default: '' },
    groupBreak: { type: String, default: 's' },
    groupVertical: { type: String, default: '' },
  },
  computed: {
    computedClass() {
      const classList = [];
      // group
      classList.push(functions.getGroupClass(this));
      // color
      if (this.color) {
        if (this.type === 'filled') {
          classList.push(`ck-component__bg-color--${this.color}`);
        } else {
          classList.push(`ck-component__border-color--${this.color}`);
        }
      }
      // // size
      // if (this.size) classList.push(`rs-component-size__${this.size}`);
      return classList;
    },
  }, // computed
}; // export default
</script>

<style scoped>
.ck-button > button {
  background-color: red !important;
}
</style>