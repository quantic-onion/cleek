<script setup lang="ts">
import TheHomeButtons from '@/views/the-home/TheHomeButtons.vue';
import TheHomeCheckbox from '@/views/the-home/TheHomeCheckbox.vue';
import TheHomeIcons from '@/views/the-home/TheHomeIcons.vue';
import TheHomeChips from '@/views/the-home/TheHomeChips.vue';
// import TheHomeInputs from '@/views/the-home/TheHomeInputs.vue';
import TheHomeSwitchOptions from '@/views/the-home/TheHomeSwitchOptions.vue';
import TheHomeSwitches from '@/views/the-home/TheHomeSwitches.vue';
</script>

<template lang="pug">
.home-container
  .left-side
    .title-container
      .logo Cleek
      h1.title Customizable components for Vue.js
      router-link(:to="{ name: 'button' }")
        ck-button.mt-8(type="filled" icon-right="circle-play")
          | Start
  .right-side
    .components-example
      TheHomeSwitchOptions
      TheHomeChips(show="danger")
      TheHomeSwitches(show="default-true")
      TheHomeButtons(show="warning")
      TheHomeCheckbox(show="true")
      TheHomeIcons(show="spinner")
      TheHomeSwitches(show="outlined")
      TheHomeButtons(show="success")
      TheHomeInputs(show="number")
      TheHomeIcons(show="secondary")
      TheHomeChips(show="common")
      TheHomeCheckbox(show="false")
      TheHomeChips(show="success")
      TheHomeSwitches(show="default-false")
      TheHomeIcons(show="blue")
      TheHomeButtons(show="light")
      TheHomeSwitches(show="squared-false")
      TheHomeButtons(show="danger")
      TheHomeIcons(show="danger")
      TheHomeChips(show="light")
      TheHomeButtons(show="secondary")
      TheHomeButtons(show="icons")
      TheHomeSwitches(show="squared-true")
      TheHomeInputs(show="password")
      TheHomeIcons(show="success")
      TheHomeSwitches(show="icon-true")
      TheHomeButtons(show="dark")
      TheHomeSwitches(show="icon-false")
      TheHomeButtons(show="primary")
</template>

<style lang="stylus" scoped>
.home-container
  display flex
  .left-side,
  .right-side
    width 50%
    min-height 70vh
    padding-y 3rem
    padding-x 1rem
    flex-center()
  .title-container,
  .components-example
    flex-center()
    height 100%
    flex-wrap wrap
    background-color white
    border-radius 3rem
    ck-box-shadow()
    font-family $logo-font
    justify-content center
    width 550px
    max-width 100%
  .left-side
    border-right 3px solid #ccc
    .title-container
      padding 3rem
      padding-y 5rem
      text-align center
      .logo
        font-size 5rem
        color $color-primary
      .title
        font-size 2.25rem
        color #666
  .right-side
    display flex
    flex-wrap wrap
    align-items center
    .components-example
      gap 1.5rem
      padding 2rem

@media(max-width 1100px)
  .home-container
    flex-wrap wrap
    .left-side
      border 0
    .left-side, .right-side
      width 100%
</style>