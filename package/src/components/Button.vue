<template lang="pug">
button(
type="button"
:class="buttonClassObject"
:title="title"
:aria-label="title"
:disabled="disabled"
@click="onClick($event)"
)
  slot
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: { type: String, default: undefined },
    title: { type: String, default: undefined },
    type: { type: String, default: 'outlined',
      validator(type) {
        return ['filled', 'outlined', 'text'].includes(type)
      },
    },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  computed: {
    buttonClassObject() {
      return {
        'is-outlined': this.type === 'outlined',
        'is-filled': this.type === 'filled',
        'is-text': this.type === 'text',
      }
    },
  }, // computed
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  }, // methods
}; // export default
</script>

<style lang="stylus" scoped>
$primary = #15b0ce
button
  cursor pointer
  display inline-flex
  align-items center
  height 32px
  padding 0 16px
  border-radius 4px
  position relative
  &::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    border-radius 4px
    z-index 1
    opacity 0
    transition opacity 0.15s ease-in-out
    background-color $primary
  &:hover::before
    opacity 0.1
  &:active::before
    opacity 0.2
  &.is-filled
    background-color $primary
    border 1px solid $primary
    color white
  &.is-outlined
    background-color transparent
    border 1px solid $primary
    color $primary
  &.is-text
    background-color transparent
    border none
    color $primary
  &.is-filled:disabled,
  &.is-outlined:disabled,
  &.is-text:disabled
    border-color #eeeeee
    background-color #eeeeee
    cursor not-allowed
  &:disabled::before
    display none
  &:disabled > span
    color #757575
</style>
