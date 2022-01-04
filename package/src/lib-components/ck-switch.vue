<template lang="pug">
  label.rv-switch
    input(
    v-model="localValue"
    type="checkbox"
    @change="$emit('change', $event)"
    )
    span.rv-switch__slider(:class="{ 'is-round': type !== 'square' }")
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
    type: { type: String, default: 'round' }, // square
  },
  computed: {
    localValue: {
      get() { return this.value; },
      set(val) { this.$emit('input', val); },
    },
  }, // computed
}; // export default
</script>

<style lang="stylus" scoped>
json('./styles/StylusVars.json')

.rv-switch
  position relative
  display inline-block
  width 60px
  height 34px
  // Hide default HTML checkbox
  input
    opacity 0
    width 0
    height 0
    &:checked + .rv-switch__slider
      background-color primary
    &:focus + .rv-switch__slider
      box-shadow 0 0 1px primary
    &:checked + .rv-switch__slider:before
      -webkit-transform translateX(26px)
      -ms-transform translateX(26px)
      transform translateX(26px)
  /* The slider */
  .rv-switch__slider
    position absolute
    cursor pointer
    top 0
    left 0
    right 0
    bottom 0
    background-color #ccc
    -webkit-transition .4s
    transition .4s
    &:before
      position absolute
      content ""
      height 26px
      width 26px
      left 4px
      bottom 4px
      background-color white
      -webkit-transition .4s
      transition .4s
    // Rounded sliders
    &.is-round
      border-radius: 34px;
      &:before
        border-radius 50%
</style>
