<template lang="pug">
.the-footer
  span.pr-2 Developed by
  a.quantic-onion-button(href="https://quanticonion.com" target="_blank")
    ck-img(src="https://img.quanticonion.com/quantic-onion/logos/logo-white.svg" alt="Quantic Onion" height="2.75rem")
</template>

<style lang="stylus">
.the-footer
  font-family 'Pompiere', cursive
  color white
  font-size 1.2rem
  flex-center()
  padding 1rem
  background-color $color-primary
  position absolute
  bottom 0
  width 100%
</style>