<template lang="pug">
#app
  .sandbox-container
    h1.sandbox-title Centro de pruebas universal
    //- CheckSameHeight
    //- ShowerSelect
    ShowerButton
    //- ShowerInputText
    //- ShowerTextarea
    //- ShowerIcon
    //- ShowerLabel
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { CleekSample } from '@/entry.esm';
import CheckSameHeight from './showers/CheckSameHeight.vue';
import ShowerButton from './showers/ShowerButton.vue';
import ShowerIcon from './showers/ShowerIcon.vue';
import ShowerInputText from './showers/ShowerInputText.vue';
import ShowerLabel from './showers/ShowerLabel.vue';
import ShowerSelect from './showers/ShowerSelect.vue';
import ShowerTextarea from './showers/ShowerTextarea.vue';

export default defineComponent({
  components: {
    CheckSameHeight,
    ShowerButton,
    ShowerIcon,
    ShowerInputText,
    ShowerLabel,
    ShowerSelect,
    ShowerTextarea,
  },
  name: 'ServeDev',
  // components: {
  //  CleekSample,
  // }
}); // export default
</script>

<style lang="stylus" scoped>
.sandbox-container
  background-color #eee
  width 100%
  border-right 3px solid #ccc
  border-bottom @border-right
  .sandbox-title
    text-align center
</style>


<style lang="stylus" scoped>
html
  font-size 14px !important
  font-family Montserrat, Helvetica, Arial, sans-serif

// general
h5
  margin-bottom .5rem
  padding-left .5rem
</style>