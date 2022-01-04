<template lang="pug">
#app
  .sandbox-container
    h1.sandbox-title Centro de pruebas universal
    CheckSameHeight
    ShowerSelect
    ShowerButton
    ShowerInputText
    ShowerTextarea
    ShowerIcon
    ShowerLabel
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


<style lang="stylus">
html
  font-size 14px !important
  font-family Montserrat, Helvetica, Arial, sans-serif

// general
h5
  margin-bottom .5rem
  padding-left .5rem

// tailwind
.flex
  display flex
.w-half
  width 50%
.w-full
  width 100%
// margin-right
.mr-1
  margin-right .25rem
.mr-2
  margin-right .5rem
.mr-3
  margin-right .75rem
.mr-4
  margin-right 1rem
// margin-left
.ml-1
  margin-left .25rem
.ml-2
  margin-left .5rem
.ml-3
  margin-left .75rem
.ml-4
  margin-left 1rem
// margin-top
.mt-1
  margin-top .25rem
.mt-2
  margin-top .5rem
.mt-3
  margin-top .75rem
.mt-4
  margin-top 1rem
// margin-bottom
.mb-1
  margin-bottom .25rem
.mb-2
  margin-bottom .5rem
.mb-3
  margin-bottom .75rem
.mb-4
  margin-bottom 1rem
// padding-right
.pr-1
  padding-right .25rem
.pr-2
  padding-right .5rem
.pr-3
  padding-right .75rem
.pr-4
  padding-right 1rem
// padding-left
.pl-1
  padding-left .25rem
.pl-2
  padding-left .5rem
.pl-3
  padding-left .75rem
.pl-4
  padding-left 1rem
// padding-top
.pt-1
  padding-top .25rem
.pt-2
  padding-top .5rem
.pt-3
  padding-top .75rem
.pt-4
  padding-top 1rem
// padding-bottom
.pb-1
  padding-bottom .25rem
.pb-2
  padding-bottom .5rem
.pb-3
  padding-bottom .75rem
.pb-4
  padding-bottom 1rem
</style>